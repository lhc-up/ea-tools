const path = require('path');
const { Base } = require('./base.js');
const { Paragraph } = require('./paragraph.js');

/**
 * @file 图表操作相关方法
 * @author haoluo2
 * @version 1.0.0
 */

/**
 * 图表操作相关方法
 * @namespace Chart
 */
exports.Chart = {};

/**
 * 根据图表名称找到与图表关联的excel路径
 * 
 * @memberof Chart
 * @param {String} docPath - 文档文件夹
 * @param {String} chartName - 图表名称
 * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例
 * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法
 * @returns {String} 图表关联的Excel文件路径
 */
Chart.getExcelPathByChartName = function getExcelPathByChartName(docPath, chartName, $, strict=false) {
    const chartPath = Chart.getChartPathByName(docPath, chartName, $, strict);
    if (!chartPath) return false;
    return Chart.getExcelPathByChartPath(docPath, chartPath);
}

/**
 * 根据图表chartN.xml文件路径找到对应的Excel文件路径
 * 
 * @memberof Chart
 * @param {String} docPath - 文档文件夹
 * @param {String} chartPath - 图表chartN.xml文件路径
 * @returns {String} 图表关联的Excel文件路径
 */
Chart.getExcelPathByChartPath = function getExcelPathByChartPath(docPath, chartPath) {
    if (!chartPath) return false;

    const chartFileName = path.basename(chartPath);
    const relsPath = path.join(docPath, `word/charts/_rels/${chartFileName}.rels`);
    const $rels = Base.loadXmlFile(relsPath);

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
 * 根据图表名称找到图表chart.xml文件路径，匹配到多个时只取第一个
 * 
 * @memberof Chart
 * @param {String} docPath 
 * @param {String} chartName 
 * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例
 * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法
 * @returns {String} 图表chartN.xml文件路径
 */
Chart.getChartPathByName = function getChartPathByName(docPath, chartName, $, strict=false) {
    $ = $ || Base.loadXmlFile(path.join(docPath, 'word/document.xml'));
    const numberingWp = Paragraph.getNumberingByName($, chartName, true, strict);

    // 图表结构所在的wp
    const $wp = numberingWp.eq(0).prev();
    if (!$wp) return null;
    
    const rId = $wp.find('c\\:chart').attr('r:id');
    // 根据rId找到chart.xml
    return Chart.getChartPathByRid(docPath, rId, $);
}

/**
 * 根据rId获取chart.xml路径
 * 
 * @memberof Chart
 * @param {String} docPath - 文档文件夹
 * @param {String|Number} rId document.xml中，图表的引用id
 * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例
 * @returns {String} 图表chartN.xml文件路径
 */
Chart.getChartPathByRid = function getChartPathByRid(docPath, rId, $) {
    $ = $ || Base.loadXmlFile(path.join(docPath, 'word/document.xml'));
    const $rels = Base.loadXmlFile(path.join(docPath, 'word/_rels/document.xml.rels'));
    const rel = $rels(`Relationship[Id=${rId}]`);
    return path.join(docPath, `word/${rel.attr('Target')}`);
}

/**
 * 根据图表chart.xml路径找到drawing.xml路径
 * 
 * @memberof Chart
 * @param {String} chartPath - 图表chartN.xml文件路径
 * @returns {String} 图表中的drawing.xml路径，如散点图中的辅助线
 */
Chart.getChartDrawingPathByChartPath = function getChartDrawingPathByChartPath(chartPath) {
    const $chart = Base.loadXmlFile(chartPath);
    const rId = $chart('c\\:userShapes').attr('r:id');
    if (!rId) return null;

    const chartFileName = path.basename(chartPath);
    const chartRelsPath = path.join(path.dirname(chartPath), '_rels', `${chartFileName}.rels`);
    const $rels = Base.loadXmlFile(chartRelsPath);
    const rel = $rels(`Relationship[Id=${rId}]`);
    const drawingTarget = rel.attr('Target');
    return path.resolve(path.dirname(chartPath), drawingTarget);
}

Chart.renameCValAxTitle = function renameCValAxTitle() {
    
}