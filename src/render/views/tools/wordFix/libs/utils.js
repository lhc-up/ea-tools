const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const archiver = require('archiver');
const fsExtra = require('fs-extra');
const extract = require('extract-zip');

// cheerio解析xml参数
const cheerioOptions = {
    normalizeWhitespace: false,
    xmlMode: true,
    decodeEntities: false
};

function get$($) {
    if ($.find && $.find instanceof Function) {
        return $.find.bind($);
    }
    return $;
}

function getFileList(dirPath) {
    const fileList = fs.readdirSync(dirPath, { withFileTypes: true });
    return fileList.filter(dirent => {
        // 过滤其他不相关文件，只保留文件夹和word文件
        const ext = path.extname(dirent.name);
        return dirent.isDirectory() || (dirent.isFile() && ext === '.docx');
    }).map(dirent => {
        if (dirent.isFile()) {
            return path.join(dirPath, dirent.name);
        }
        // isDirectory
        return getFileList(path.join(dirPath, dirent.name));
    }).flat();
}

/**
 * 设置wp缩进
 * @param {Object} $wp wp引用
 * @param {Object} option 配置项
 */
function setWpIndent($wp, {
    // 右侧
    rightChars=0,
    // 左侧
    leftChars=0
}) {
    const $ind = $wp.find('w\\:pPr w\\:ind');
    $ind.removeAttr('w:rightChars w:right');
    if (rightChars) {
        $ind.attr('w:rightChars', rightChars * 100);   
    }
    $ind.removeAttr('w:leftChars w:left');
    if (leftChars) {
        $ind.attr('w:leftChars', leftChars * 100);   
    }
}

/**
 * 根据名称查找表格
 * @param {Object} $ document.xml
 * @param {String} text 表格名称
 * @param {Boolean} strict 是否严格匹配，为true时，名称必须完全相等才会匹配；为false时，只需提供名称的一部分即可匹配（注意关键词的唯一性，匹配到多个的话只取最后一个）
 * @returns 表格xml结构
 */
function getTableByName($, text, strict) {
    const numberingWp = getNumberingByName($, text, true, strict);
    if (!numberingWp) return false;
    // 表格结构
    return numberingWp.next();
}

/**
 * 根据文字找到对应标题
 * @param {Object} $ document.xml
 * @param {String} text 标题文字
 * @param {Boolean} trim 是否忽略空格
 * @param {Boolean} strict 是否严格匹配，为true时，名称必须完全相等才会匹配；为false时，只需提供名称的一部分即可匹配（注意关键词的唯一性，匹配到多个的话只取最后一个）
 */
function getNumberingByName($, text, trim=true, strict=true) {
    // w:numPr标签一定在标题里
    const numPrList = $('w\\:numPr');
    let numberingWp = null;
    numPrList.each((i, v) => {
        let str = '';
        const wp = v.parent.parent;
        $(wp).find('w\\:r').each((j, k) => {
            str += $(k).find('w\\:t').text();
        });
        if (trim) {
            str = str.replace(/ /g, '');
            text = text.replace(/ /g, '');
        }
        if (strict) {
            if (str === text) numberingWp = $(wp);
        } else {
            if (str.includes(text)) numberingWp = $(wp);
        }
    });
    return numberingWp;
}

/**
 * 找到文本内容所在的wt
 * @param {Object} $ xml引用
 * @param {String} text 文本内容
 * @param {Boolean} strict 是否严格模式，严格模式全等匹配
 */
function getWtByText($, text, strict=true) {
    if ($.find && $.find instanceof Function) {
        $ = $.find.bind($);
    }
    const wtList = $('w\\:t');
    for (let i = 0; i < wtList.length; i++) {
        const wt = wtList.eq(i);
        if (strict) {
            if (wt.text() === text) {
                return wt;
            }
        } else {
            if (wt.text().indexOf(text) >= 0) {
                return wt;
            }
        }
    }
    return null;
}

/**
 * 获取脚注文件路径
 * @param {String} docPath 文档文件夹
 * @returns 脚注文件路径
 */
function getFootnotesPath(docPath) {
    return path.join(docPath, 'word/footnotes.xml');
}

/**
 * 根据脚注内容获取脚注id
 * @param {String} docPath 文档文件夹
 * @param {String} text 要匹配的内容，需保证唯一性
 * @param {Boolean} strict 是否严格匹配
 * @returns 脚注id
 */
function getFootnoteIdByContent(docPath, text, strict=true) {
    const xmlPath = getFootnotesPath(docPath);
    const $ = loadXmlFile(xmlPath);
    let footnoteId = null;
    text = text.replace(/ /g, '');
    $('w\\:footnote').each((i, v) => {
        if (footnoteId) return;
        let wpText = '';
        $(v).find('w\\:p').each((j, wp) => {
            wpText += getWpAllText($(wp));
        });
        if (!wpText) return;
        wpText = wpText.replace(/ /g, '');
        if (strict) {
            if (wpText === text) footnoteId = $(v).attr('w:id');
        } else {
            if (wpText.includes(text)) footnoteId = $(v).attr('w:id');
        }
    });
    return footnoteId;
}

/**
 * 根据脚注id获取脚注内容
 * @param {String} docPath 文档文件夹
 * @param {String} id 脚注id
 * @returns 脚注内容纯文本
 */
function getFootnoteContentById(docPath, id) {
    const xmlPath = getFootnotesPath(docPath);
    const $ = loadXmlFile(xmlPath);
    const $footnote = $(`w\\:footnote[w\\:id=${id}]`);
    let wpText = '';
    $footnote.find('w\\:p').each((i, wp) => {
        wpText += getWpAllText($(wp));
    });
    return wpText;
}

/**
 * 找到文本内容所在的wp，文本可能存在于多个wr的wt中
 * @param {Object} $ xml引用
 * @param {String} text 文本内容
 * @param {Boolean} strict 是否严格模式
 * @param {Boolean} trim 是否忽略空格
 * @returns wp xml
 */
function getWpByText($, text, strict=false, trim=false) {
    if ($.find && $.find instanceof Function) {
        $ = $.find.bind($);
    }
    const wpList = $('w\\:p');
    for (let i = 0; i < wpList.length; i++) {
        const wp = wpList.eq(i);
        
        // 不匹配目录中的文本
        if (wp.find('w\\:hyperlink').length > 0) continue;

        let wpText = getWpAllText(wp);
        if (trim) {
            wpText = wpText.replace(/ /g, '');
        }
        // 严格匹配时，wpText必须和给定文本相等
        // 非严格匹配时，wpText包含给定文本
        const is = strict ? wpText === text : wpText.includes(text);
        if (is) return wp;
    }
    return null;
}

/**
 * 根据图表名称找到与图表关联的excel路径
 * @param {String} docPath 文档文件夹
 * @param {String} name 图表名称
 * @param {Object} $ document引用
 * @param {Boolean} strict 是否严格匹配，为true时，名称必须完全相等才会匹配；为false时，只需提供表名称的一部分即可匹配（）
 */
function getExcelPathByChartName(docPath, name, $, strict) {
    const chartPath = getChartPathByName(docPath, name, $, strict);
    if (!chartPath) return false;

    return getExcelPathByChartPath(chartPath, docPath);
}

/**
 * 根据图表文件路径找到对应的Excel文件路径
 * @param {String} chartPath 
 * @param {String} docPath 
 * @returns Excel路径
 */
function getExcelPathByChartPath(chartPath, docPath) {
    if (!chartPath) return false;

    const chartFileName = path.basename(chartPath);
    const relsPath = path.join(docPath, `word/charts/_rels/${chartFileName}.rels`);
    const $rels = loadXmlFile(relsPath);

    let excelName = '';
    $rels('Relationship').each((i, v) => {
        const target = $rels(v).attr('Target');
        if (target.endsWith('.xlsx')) {
            excelName = path.basename(target);
        }
    });
    return path.join(docPath, `word/embeddings/${excelName}`);
}

/**
 * 根据图表名称找到图表chart.xml文件路径
 * @param {String} docPath 文档文件夹
 * @param {String} name 图表名称
 * @param {Object} $ document引用
 * @param {Boolean} strict 是否严格匹配，为true时，名称必须完全相等才会匹配；为false时，只需提供名称的一部分即可匹配（注意关键词的唯一性，匹配到多个的话只取最后一个）
 */
function getChartPathByName(docPath, name, $, strict=true) {
    if (!$) {
        $ = loadXmlFile(path.join(docPath, 'word/document.xml'));
    }
    const numberingWp = getNumberingByName($, name, true, strict);
    if (!numberingWp) return false;

    // 图表结构所在的wp
    const $wp = numberingWp.prev();
    if (!$wp) return false;
    
    const rId = $wp.find('c\\:chart').attr('r:id');
    // 根据rId找到chart.xml
    return getChartPathByRid(docPath, rId, $);
}

/**
 * 根据rId获取chart.xml路径
 * @param {String} docPath 文档文件夹
 * @param {String} rId chart rId
 * @param {Object} $ document引用
 * @returns chart.xml路径
 */
function getChartPathByRid(docPath, rId, $) {
    if (!$) {
        $ = loadXmlFile(path.join(docPath, 'word/document.xml'));
    }
    const $rels = loadXmlFile(path.join(docPath, 'word/_rels/document.xml.rels'));
    const rel = $rels(`Relationship[Id=${rId}]`);
    return path.join(docPath, `word/${rel.attr('Target')}`);
}

/**
 * 根据图表chart.xml路径找到drawing.xml路径
 * @param {String} chartPath 图表chart.xml路径
 * @returns drawing.xml路径
 */
function getChartDrawingPathByChartPath(chartPath) {
    const $chart = loadXmlFile(chartPath);
    const rId = $chart('c\\:userShapes').attr('r:id');
    if (!rId) return false;

    const chartFileName = path.basename(chartPath);
    const chartRelsPath = path.join(path.dirname(chartPath), '_rels', `${chartFileName}.rels`);
    const $rels = loadXmlFile(chartRelsPath);
    const rel = $rels(`Relationship[Id=${rId}]`);
    const drawingTarget = rel.attr('Target');
    return path.resolve(path.dirname(chartPath), drawingTarget);
}
/**
 * 解析xml文件
 * @param filePath xml文件路径
 */
function loadXmlFile(filePath) {
    try {
        return cheerio.load(fs.readFileSync(filePath), cheerioOptions);
    } catch (err) {
        throw new Error('解析xml文件失败,filePath:' + filePath);
    }
}

/**
 * 往wp的一个wr中写入文字
 * @param {Object} $wp 
 * @param {String} text 
 */
function writeToWpInSingleWr($wp, text) {
    const $wr = $wp.find('w\\:r:first').clone();
    $wr.find('w\\:t').text(text);

    $wp.find('w\\:r').remove();
    $wp.append($wr);
}

function deleteFileSync(filePath) {
    fsExtra.removeSync(filePath);
}

/**
 * 解析xml字符串
 * @param xml xml字符串
 * @returns $
 */
function loadXmlStr(xml) {
    try {
        return cheerio.load(xml, cheerioOptions);
    } catch (err) {
        throw new Error('解析xml字符串失败,xml:' + xml);
    }
}
/**
 * 解压word，重命名->解压->重命名
 * @param {String} word文档地址 docPath 
 * @returns Promise<dirPath>
 */
function unPkg(docPath) {
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

/**
 * 把文件夹目录打包成docx文件
 * zip会打包到和unPkgPath同一级目录
 * 如果目标地址已经有同名文件，则会覆盖
 * @param {String} unPkgPath 解压后的word文档目录
 * @param {String} destPath 目标地址，不传则在当前目录生成并覆盖原文件
 * @returns Promise<destPath>
 */
function pkg(unPkgPath, destPath) {
    return new Promise((resolve, reject) => {
        try {
            destPath = destPath || `${unPkgPath}.docx`;
            const zipPath = `${unPkgPath}.zip`;
            const output = fs.createWriteStream(zipPath);
            const archive = archiver('zip', {zlib: {level: 8}});
            archive.pipe(output);
            archive.directory(unPkgPath, false);
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
                fs.renameSync(zipPath, destPath);
                resolve(destPath);
            });
        } catch(e) {
            reject(e);
        }
    });
}

/**
 * 获取表格指定单元格内容
 * @param {String} $tbl 表格引用
 * @param {String} trIndex 行索引
 * @param {Number} tcIndex 列索引
 * @param {Boolean} toNumber 是否转换为数字
 * @returns 单元格内容
 */
function getTableCellText($tbl, trIndex, tcIndex, toNumber=false) {
    if (!$tbl) return '';
    const $tc = $tbl.find('w\\:tr').eq(trIndex).find('w\\:tc').eq(tcIndex);
    const text = $tc.find('w\\:t').text();
    
    return toNumber ? parseFloat(text) : text;
}

/**
 * 获取wp中的所有文本，一个wp中可能有多个wr
 * @param {Object} $wp wp引用
 * @returns wp标签中的所有文本
 */
function getWpAllText($wp) {
    let text = '';
    const wtList = $wp.find('w\\:t');
    wtList.each((i, v) => {
        text += wtList.eq(i).text();
    });
    return text;
}

/**
 * 删除多余批注
 * @param {String} xml 文档内容
 * @returns xml
 */
function removeExtraComments(xml) {
    const $ = loadXmlStr(xml);
    // <w:commentRangeStart w:id="29" />
    // <w:commentRangeEnd w:id="29" />
    // <w:commentReference w:id="29" />
    const startIdSet = new Set();
    const endIdSet = new Set();
    const refIdSet = new Set();

    const commentRangeStartList = $('w\\:commentRangeStart');
    const commentRangeEndList = $('w\\:commentRangeEnd');
    const commentReferenceList = $('w\\:commentReference');

    commentRangeStartList.each((i, v) => {
        const id = $(v).attr('w:id');
        if (startIdSet.has(id)) {
            $(v).remove();
        }
        startIdSet.add(id);
    });

    commentRangeEndList.each((i, v) => {
        const id = $(v).attr('w:id');
        if (endIdSet.has(id)) {
            $(v).remove();
        }
        endIdSet.add(id);
    });

    commentReferenceList.each((i, v) => {
        const id = $(v).attr('w:id');
        if (refIdSet.has(id)) {
            $(v).remove();
        }
        refIdSet.add(id);
    });

    return $.xml();
}

/**
 * 行列转换
 * @param matrix 二维矩阵
 * @returns 转换后的二维矩阵
 */
function transposeMatrix(matrix) {
    return matrix[0].map((v, i) => matrix.map(k => k[i]));
}

module.exports = {
    getTableByName,
    getWtByText,
    getChartPathByName,
    getChartPathByRid,
    getChartDrawingPathByChartPath,
    loadXmlFile,
    loadXmlStr,
    unPkg,
    pkg,
    deleteFileSync,
    getTableCellText,
    getWpAllText,
    removeExtraComments,
    getNumberingByName,
    writeToWpInSingleWr,
    getWpByText,
    getExcelPathByChartName,
    getExcelPathByChartPath,
    setWpIndent,
    getFileList,
    getFootnotesPath,
    getFootnoteIdByContent,
    getFootnoteContentById,
    transposeMatrix
};