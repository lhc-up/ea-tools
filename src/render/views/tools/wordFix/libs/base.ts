import archiver from 'archiver';
import fs from 'fs';

/**
 * @file 基础方法
 * @author haoluo2
 * @version 1.0.0
 */

/**
 * 测试方法
 * @param a 测试字符串
 * @memberof base
 */
export function test(a: string): void {
    console.log('a', a);
    fs.writeFileSync('./test.txt', a);
}

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
