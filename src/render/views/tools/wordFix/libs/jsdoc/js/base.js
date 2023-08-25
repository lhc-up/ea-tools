"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg = exports.test = void 0;
var archiver_1 = require("archiver");
var fs_1 = require("fs");
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
function test(a) {
    console.log('a', a);
    fs_1.default.writeFileSync('./test.txt', a);
}
exports.test = test;
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
