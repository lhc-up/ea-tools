"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileList = exports.loadXmlStr = exports.loadXmlFile = exports.unPkg = exports.pkg = void 0;
var archiver_1 = require("archiver");
var fs_1 = require("fs");
var path_1 = require("path");
var adm_zip_1 = require("adm-zip");
var cheerio = require("cheerio");
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
function pkg(docPath, destPath) {
    return new Promise(function (resolve, reject) {
        try {
            var zipPath_1 = "".concat(docPath, ".zip");
            var output = fs_1.default.createWriteStream(zipPath_1);
            var archive = (0, archiver_1.default)('zip', { zlib: { level: 8 } });
            archive.pipe(output);
            archive.directory(docPath, false);
            archive.finalize();
            archive.on('error', function (e) {
                reject(e);
            });
            // 创建流失败时触发的error，不会触发archive的error事件
            output.on('error', function (e) {
                reject(e);
            });
            // archive写入完成后，ouput自动关闭
            output.on('close', function () {
                // 重命名为docx
                var wordPath = destPath !== null && destPath !== void 0 ? destPath : "".concat(docPath, ".docx");
                fs_1.default.renameSync(zipPath_1, wordPath);
                resolve(wordPath);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.pkg = pkg;
/**
 * 解压Word文件
 * 此方法依赖adm-zip{@link https://github.com/cthackers/adm-zip}
 * @requires https://github.com/cthackers/adm-zip
 * @memberof base
 * @param docPath Word文件路径
 * @returns 解压后的文档文件夹路径
 */
function unPkg(docPath) {
    return new Promise(function (resolve, reject) {
        var zipPath = docPath.replace('.docx', '.zip');
        var dirPath = docPath.replace('.docx', '');
        fs_1.default.renameSync(docPath, zipPath);
        try {
            var zip = new adm_zip_1.default(zipPath);
            zip.extractAllTo(dirPath, true);
            fs_1.default.renameSync(zipPath, docPath);
            resolve(dirPath);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.unPkg = unPkg;
// cheerio解析xml参数
var cheerioOptions = {
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
function loadXmlFile(filePath) {
    try {
        return cheerio.load(fs_1.default.readFileSync(filePath), cheerioOptions);
    }
    catch (_a) {
        throw new Error('解析xml文件失败，filePath：' + filePath);
    }
}
exports.loadXmlFile = loadXmlFile;
/**
 * 解析xml字符串
 * @memberof base
 * @param xml xml字符串
 * @returns cheerio.Root，继承自Selector，选择器返回Cheerio
 */
function loadXmlStr(xml) {
    try {
        return cheerio.load(xml, cheerioOptions);
    }
    catch (_a) {
        throw new Error('解析xml字符串失败,xml:' + xml);
    }
}
exports.loadXmlStr = loadXmlStr;
/**
 * 递归获取文件夹中的文件，默认只取docx文件
 * @memberof base
 * @param dirPath 文件夹路径
 * @param filters 可选，指定要获取的文件的后缀名，如.docx
 * @returns 文件路径列表
 */
function getFileList(dirPath, filters) {
    var fileList = fs_1.default.readdirSync(dirPath, { withFileTypes: true });
    return fileList.filter(function (dirent) {
        // 过滤其他不相关文件，只保留文件夹和word文件（默认）
        var ext = path_1.default.extname(dirent.name);
        if (dirent.isDirectory())
            return true;
        // 默认只保留docx文件
        if (!(filters === null || filters === void 0 ? void 0 : filters.length))
            filters === null || filters === void 0 ? void 0 : filters.push('.docx');
        return filters === null || filters === void 0 ? void 0 : filters.includes(ext);
    }).map(function (dirent) {
        if (dirent.isFile()) {
            return path_1.default.join(dirPath, dirent.name);
        }
        // isDirectory
        return getFileList(path_1.default.join(dirPath, dirent.name));
    }).flat();
}
exports.getFileList = getFileList;
