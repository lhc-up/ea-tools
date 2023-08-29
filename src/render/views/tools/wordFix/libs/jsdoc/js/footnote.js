const path = require('path');
const { Base } = require('./base.js');
const { Paragraph } = require('./paragraph.js');

/**
 * @file 脚注操作相关方法
 * @author haoluo2
 * @version 1.0.0
 */

/**
 * 脚注操作相关方法
 * @namespace Footnote
 */
exports.Footnote = {};

/**
 * 获取脚注内容文件路径
 * 
 * @memberof Footnote
 * @param {String} docPath - 文档文件夹
 * @returns {String} 脚注内容文件路径
 */
Footnote.getFootnotesPath = function getFootnotesPath(docPath) {
    return path.join(docPath, 'word/footnotes.xml');
}

/**
 * 根据脚注内容获取脚注id
 * 
 * @memberof Footnote
 * @param {String} docPath - 文档文件夹
 * @param {String} text - 脚注内容
 * @param {Boolean} [strict=true] - 是否严格模式，若为true则使用===匹配，否则使用includes方法
 * @returns {String} 符合要求的脚注id
 */
Footnote.getFootnoteIdByContent = function getFootnoteIdByContent(docPath, text, strict=true) {
    const xmlPath = Footnote.getFootnotesPath(docPath);
    const $ = Base.loadXmlFile(xmlPath);
    let footnoteId = null;
    text = text.replace(/ /g, '');
    $('w\\:footnote').each((i, v) => {
        if (footnoteId) return;
        let wpText = '';
        $(v).find('w\\:p').each((j, wp) => {
            wpText += Paragraph.getWpAllText($(wp));
        });
        if (!wpText) return;
        wpText = wpText.replace(/ /g, '');
        const is = strict ? wpText === text : wpText.includes(text);
        if (is) footnoteId = $(v).attr('w:id');
    });
    return footnoteId;
}

/**
 * 根据脚注id获取脚注内容
 * 
 * @memberof Footnote
 * @param {String} docPath - 文档文件夹
 * @param {String|Number} footnoteId - 脚注id
 * @returns {String} 脚注内容纯文本
 */
Footnote.getFootnoteContentById = function getFootnoteContentById(docPath, footnoteId) {
    const xmlPath = Footnote.getFootnotesPath(docPath);
    const $ = Base.loadXmlFile(xmlPath);
    const $footnote = $(`w\\:footnote[w\\:id=${footnoteId}]`);
    const text = $footnote.find('w\\:p').map((i, v) => {
        return Paragraph.getWpAllText($(v));
    }).toArray().join('');
    return text;
}