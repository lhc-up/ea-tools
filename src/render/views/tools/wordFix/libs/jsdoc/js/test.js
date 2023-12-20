const archiver = require('archiver');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const AdmZip = require('adm-zip');
const cheerio = require('cheerio');

// TODO: 使用module注解
/**
 * @file Test 基础操作相关方法
 * @author haoluo2
 * @version 1.0.0
 */

/**
 * 基础操作相关方法
 * @module Tase
 */

/**
 * 把文件夹打包为Word文件
 * 
 * @param {String} docPath - 解压后的文档文件夹路径
 * @param {String} [destPath] - 可选，生成的docx文档地址
 * @returns {String} 压缩后的docx文档地址，如果destPath有效，则使用该地址，否则在docPath当前目录中生成
 */
exports.pkg = function pkg(docPath, destPath) {
    return new Promise((resolve, reject) => {
        try {
            const zipPath = `${docPath}.zip`;
            const output = fs.createWriteStream(zipPath);
            const archive = archiver('zip', { zlib: { level: 8 } });
            archive.pipe(output);
            archive.directory(docPath, false);
            archive.finalize();

            archive.on('error', e => {
                reject(e);
            });

            // 创建流失败时触发的error，不会触发archive的error事件
            output.on('error', e => {
                reject(e);
            });

            // archive写入完成后，ouput自动关闭
            output.on('close', () => {
                // 重命名为docx
                const wordPath = destPath ?? `${docPath}.docx`;
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
 * 
 * @param {String} docPath - Word文件路径
 * @returns {String} 解压后的文档文件夹路径
 */
exports.unPkg = function unPkg(docPath) {
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
const cheerioOptions = {
    normalizeWhitespace: false,
    xmlMode: true,
    decodeEntities: false
}

/**
 * 解析xml文件
 * 
 * @param {String} filePath - xml文件路径
 * @returns {Cheerio.Root} Cheerio.Root(extends Selector)
 * @example
 * const $ = loadXmlFile('filePath.xml');
 * $('w\\:p').text('test');
 */
exports.loadXmlFile = function loadXmlFile(filePath) {
    return cheerio.load(fs.readFileSync(filePath), cheerioOptions);
}

/**
 * 解析xml字符串
 * 
 * @param {String} xml - xml字符串
 * @returns {Cheerio.Root} Cheerio.Root(extends Selector)
 * @see {@link loadXmlFile}
 */
exports.loadXmlStr = function loadXmlStr(xml) {
    return cheerio.load(xml, cheerioOptions);
}

/**
 * 递归获取文件夹中的文件，默认只取docx文件
 * 
 * @param {String} dirPath - 文件夹路径
 * @param {Array} [filters=['.docx']] - 可选，指定要获取的文件的后缀名，如.docx
 * @returns {Array} 文件路径列表
 */
exports.getFileList = function getFileList(dirPath, filters=['.docx']) {
    const fileList = fs.readdirSync(dirPath, { withFileTypes: true });
    return fileList.filter(dirent => {
        // 过滤其他不相关文件，只保留文件夹和word文件（默认）
        const ext = path.extname(dirent.name);
        if (dirent.isDirectory()) return true;
        // 默认只保留docx文件
        if (!filters?.length) filters?.push('.docx');
        return filters?.includes(ext);
    }).map(dirent => {
        if (dirent.isFile()) {
            return path.join(dirPath, dirent.name);
        }
        // isDirectory
        return getFileList(path.join(dirPath, dirent.name));
    }).flat();
}

/**
 * 二维数组行列转换
 * 
 * @param {Array} matrix - 二维数组
 * @returns {Array} 行列转置后的数组
 */
exports.transposeMatrix = function transposeMatrix(matrix) {
    return matrix[0].map((v, i) => matrix.map(k => k[i]));
}

/**
 * 删除文件
 * 
 * @param {String} filePath - 文件地址
 */
exports.delFileSync = function delFileSync(filePath) {
    fse.removeSync(filePath);
}