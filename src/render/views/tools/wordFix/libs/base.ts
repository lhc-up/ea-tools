import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import * as cheerio from 'cheerio';

/**
 * @file 基础操作相关方法
 * @author haoluo2
 * @version 1.0.0
 */


/**
 * 把文件夹打包为Word文件
 * 此方法依赖node-archiver{@link https://github.com/archiverjs/node-archiver}
 * @requires https://github.com/archiverjs/node-archiver
 * @memberof base
 * @param docPath 解压后的文档文件夹路径
 * @param destPath 压缩后的docx文档地址
 * @returns 压缩后的docx文档地址，如果destPath有效，则使用该地址，否则使用`${docPath}.docx`
 */
export function pkg(docPath: string, destPath?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const zipPath = `${docPath}.zip`;
            const output = fs.createWriteStream(zipPath);
            const archive = archiver('zip', { zlib: { level: 8 } });
            archive.pipe(output);
            archive.directory(docPath, false);
            archive.finalize();

            archive.on('error', (e: Error) => {
                reject(e);
            });

            // 创建流失败时触发的error，不会触发archive的error事件
            output.on('error', (e: Error) => {
                reject(e);
            });

            // archive写入完成后，ouput自动关闭
            output.on('close', () => {
                // 重命名为docx
                const wordPath: string = destPath ?? `${docPath}.docx`;
                fs.renameSync(zipPath, wordPath);
                resolve(wordPath);
            });
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * 解压Word文件
 * 此方法依赖adm-zip{@link https://github.com/cthackers/adm-zip}
 * @requires https://github.com/cthackers/adm-zip
 * @memberof base
 * @param docPath Word文件路径
 * @returns 解压后的文档文件夹路径
 */
export function unPkg(docPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const zipPath = docPath.replace('.docx', '.zip');
        const dirPath = docPath.replace('.docx', '');
        fs.renameSync(docPath, zipPath);

        try {
            const zip = new AdmZip(zipPath);
            zip.extractAllTo(dirPath, true);

            fs.renameSync(zipPath, docPath);

            resolve(dirPath);
        } catch(err) {
            reject(err);
        }
    });
}

// cheerio解析xml参数
const cheerioOptions: cheerio.CheerioParserOptions = {
    normalizeWhitespace: false,
    xmlMode: true,
    decodeEntities: false
};

/**
 * 解析xml文件
 * @memberof base
 * @param filePath xml文件路径
 * @returns cheerio.Root，继承自Selector，选择器返回Cheerio
 */
export function loadXmlFile(filePath: string): cheerio.Root {
    try {
        return cheerio.load(fs.readFileSync(filePath), cheerioOptions);
    } catch {
        throw new Error('解析xml文件失败，filePath：' + filePath);
    }
}

/**
 * 解析xml字符串
 * @memberof base
 * @param xml xml字符串
 * @returns cheerio.Root，继承自Selector，选择器返回Cheerio
 */
export function loadXmlStr(xml: string): cheerio.Root {
    try {
        return cheerio.load(xml, cheerioOptions);
    } catch {
        throw new Error('解析xml字符串失败,xml:' + xml);
    }
}

/**
 * 递归获取文件夹中的文件，默认只取docx文件
 * @memberof base
 * @param dirPath 文件夹路径
 * @param filters 可选，指定要获取的文件的后缀名，如.docx
 * @returns 文件路径列表
 */
export function getFileList(dirPath: string, filters?: string[]): string[] {
    const fileList = fs.readdirSync(dirPath, { withFileTypes: true });
    return fileList.filter(dirent => {
        // 过滤其他不相关文件，只保留文件夹和word文件（默认）
        const ext = path.extname(dirent.name);
        if (dirent.isDirectory()) return true;
        // 默认只保留docx文件
        if (!filters?.length) filters?.push('.docx')
        return filters?.includes(ext);
    }).map(dirent => {
        if (dirent.isFile()) {
            return path.join(dirPath, dirent.name);
        }
        // isDirectory
        return getFileList(path.join(dirPath, dirent.name));
    }).flat();
}