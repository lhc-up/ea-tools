const { Paragraph } = require('./paragraph.js');

/**
 * @file 表格操作相关方法
 * @author haoluo2
 * @version 1.0.0
 */

/**
 * 表格操作相关方法
 * @namespace Table
 */
exports.Table = {};

/**
 * 根据名称查找表格
 * 
 * @memberof Table
 * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例
 * @param {String} text - 文本内容
 * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法
 * @param {Boolean} [trim=false] - 是否忽略空格，若为true，则会删除全部空格之后进行匹配
 * @returns {Cheerio} Cheerio实例，如果有多个的话，可以使用each方法进行遍历
 * @see {@link https://cheerio.js.org/docs/api/classes/Cheerio}
 */
Table.getTableByName = function getTableByName($, text, strict=false, trim=false) {
    const numberingWp = Paragraph.getNumberingByName($, text, strict, trim);
    return numberingWp.map(i => {
        return numberingWp.eq(i).next();
    });
}

/**
 * 获取表格指定单元格内容
 * 
 * @memberof Table
 * @param {Selector|Cheerio} $tbl - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例
 * @param {Number} trIndex - 行索引，从0开始
 * @param {Number} tcIndex - 列索引，从0开始
 * @param {Boolean} [toNumber=false] - 是否转换为数字
 * @returns {String|Number} 单元格内容
 */
Table.getTableCellText = function getTableCellText($tbl, trIndex, tcIndex, toNumber=false) {
    if (!$tbl) return '';
    const $tc = $tbl.find('w\\:tr').eq(trIndex).find('w\\:tc').eq(tcIndex);
    const text = $tc.find('w\\:t').text();
    
    return toNumber ? parseFloat(text) : text;
}