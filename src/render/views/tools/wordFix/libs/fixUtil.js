const { loadXmlStr, getTableByName, getChartPathByName, getWpByText, getTableCellText, writeToWpInSingleWr, getWpAllText, getNumberingByName, getWtByText } = require('./utils');
const { getExcelPathByChartName, getChartDrawingPathByChartPath, loadXmlFile } = require('./utils');
const fs = require('fs');
const xlsx = require('node-xlsx');

/**
 * 加粗文字
 * @param {String} xml document引用
 * @param {String} text 用于找到段落的文字，需保证唯一性
 * @param {Array} boldArr 需要加粗的文字列表
 * @returns 
 */
function setBoldForText(xml, text, boldArr) {
    const $ = loadXmlStr(xml);
    const $wp = getWpByText($, text);
    if (!$wp) {
        this.addLog(`未找到${text}所在的段落`);
        return xml;
    }

    const wpText = getWpAllText($wp);
    
    // /(text1)|(text2)|(text3)/g
    const reg = new RegExp(`${boldArr.map(v => `(${v})`).join('|')}`, 'g');
    const identifier = '=*=';
    const textArr = wpText
        // 需要加粗的文字替换为特殊标识
        .replace(reg, identifier)
        // 以上述特殊标识分隔文字
        .split(identifier);
    const wr = $wp.find('w\\:r:first').clone();
    const boldWr = wr.clone();
    boldWr.find('w\\:b').remove();
    boldWr.find('w\\:rPr').append('<w:b />');

    // 移除所有加粗标签
    $wp.find('w\\:b').remove();
    // 移除所有wr
    $wp.find('w\\:r').remove();
    textArr.forEach((v, i) => {
        if (v) {
            const node = wr.clone();
            node.find('w\\:t').text(v);
            $wp.append(node);
        }
        if (i < textArr.length - 1) {
            const node = boldWr.clone();
            node.find('w\\:t').text(boldArr[i]);
            $wp.append(node);
        }
    });
    return $.xml();
}

/**
 * 修改图表值轴名称
 * @param {String} xml document xml
 * @param {String} name 图表名称
 * @param {String} docPath 解压后的文档路径
 * @param {String} renameTo 修改后的名称
 * @returns 
 */
function renameCValAxTitle(xml, name, docPath, renameTo) {
    const $ = loadXmlStr(xml);
    const chartPath = getChartPathByName(docPath, name, $);
    if (!chartPath) {
        this.addLog(`未找到图表${name}`);
        return false;
    }
    const $chart = loadXmlFile(chartPath);
    const $title = $chart('c\\:valAx c\\:title');
    const $ar = $title.find('a\\:r:first').clone();
    $ar.find('a\\:t').text(renameTo);

    $title.find('a\\:p a\\:r').remove();
    $title.find('a\\:p').append($ar);

    fs.writeFileSync(chartPath, $chart.xml());
}

/**
 * 重置图表坐标轴刻度
 * @param {String} xml document引用
 * @param {String} name 图表名称
 * @param {String} docPath 解压后的文档路径
 * @param {String} from 原名称
 * @param {String} to 修改后的名称
 */
function renameLegend(xml, name, docPath, from, to) {
    const $ = loadXmlStr(xml);
    const chartPath = getChartPathByName(docPath, name, $);
    const chartExcelPath = getExcelPathByChartName(docPath, name, $);

    if (!chartPath || !chartExcelPath) {
        this.addLog(`未找到图表${name}`);
        return false;
    }

    // 修改xml
    const $chart = loadXmlStr(fs.readFileSync(chartPath));
    $chart('c\\:v').each((i, v) => {
        const text = $chart(v).text();
        if (!text) return;
        $chart(v).text(text.replace(from, to));
    });
    fs.writeFileSync(chartPath, $chart.xml());

    // 修改excel
    const sheetList = xlsx.parse(chartExcelPath);
    sheetList.forEach(sheet => {
        sheet.data = sheet.data.map(row => {
            return row.map(v => {
                if (v && v.replace) {
                    return v.replace(from, to);
                }
                return v;
            });
        });
    });
    const buffer = xlsx.build(sheetList);
    fs.writeFileSync(chartExcelPath, buffer);
}

/**
 * 重置图表坐标轴刻度
 * @param {String} xml document引用
 * @param {String} name 图表名称
 * @param {String} docPath 解压后的文档路径
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Number} unit 刻度单位
 */
function resetAxisDuration(xml, name, docPath, min, max, unit) {
    const $ = loadXmlStr(xml);
    const chartPath = getChartPathByName(docPath, name, $);

    if (!chartPath) {
        this.addLog(`未找到图表${name}`);
        return false;
    }
    
    const $chart = loadXmlStr(fs.readFileSync(chartPath));

    if (max) {
        $chart('c\\:valAx c\\:scaling c\\:max').remove();
        $chart('c\\:valAx c\\:scaling').append(`<c:max val="${max}" />`);
    }
    if (min !== undefined) {
        $chart('c\\:valAx c\\:scaling c\\:min').remove();
        $chart('c\\:valAx c\\:scaling').append(`<c:min val="${min}" />`);
    }
    if (unit) {
        $chart('c\\:valAx c\\:majorUnit').remove();
        $chart('c\\:valAx').append(`<c:majorUnit val="${unit}" />`);
    }
    fs.writeFileSync(chartPath, $chart.xml());
}

/**
 * 重命名numbering
 * @param {String} xml document.xml
 * @param {String} name 原名称
 * @param {String} renameTo 修改为
 * @returns 
 */
function renameNumbering(xml, name, renameTo) {
    const $ = loadXmlStr(xml);
    const $wp = getNumberingByName($, name);
    if (!$wp) {
        this.addLog(`${name}未找到`);
        return xml;
    }
    writeToWpInSingleWr($wp, renameTo);
    return $.xml();
}

/**
 * 替换wp中的文本，替换之后写入同一个wr中
 * @param {String} xml document.xml
 * @param {String} text 原文本
 * @param {String} replacement 替换后文本 
 * @returns 
 */
function replaceWpText(xml, text, replacement, all, strict=false, trim=false) {
    const $ = loadXmlStr(xml);
    const $wp = getWpByText($, text, strict, trim);
    if (!$wp) {
        this.addLog(`未找到${text}所在的段落`);
        return xml;
    }
    const wpText = getWpAllText($wp);
    if (all) {
        writeToWpInSingleWr($wp, wpText.replaceAll(text, replacement));
    } else {
        writeToWpInSingleWr($wp, wpText.replace(text, replacement));
    }
    return $.xml();
}
/**
 * 替换wt中的文本，严格匹配
 * @param {String} xml document.xml
 * @param {String} text 原文本
 * @param {String} replacement 替换后文本
 * @returns 
 */
function replaceWtText(xml, text, replacement, strict=true) {
    const $ = loadXmlStr(xml);
    const $wt = getWtByText($, text, strict);
    if (!$wt) {
        this.addLog(`未找到${text}所在的wt`)
        return xml;
    }
    $wt.text($wt.text().replaceAll(text, replacement));
    return $.xml();
}
/**
 * 全文替换100.0，0.0
 * @param {String} xml document.xml
 */
function fix100_0and0_0(xml) {
    const $ = loadXmlStr(xml);
    const wtList = $('w\\:t');
    wtList.each((i, wt) => {
        const text = $(wt).text();
        const str = text.replace(/\d+\.\d+/g, (a, b, c, d) => {
            if (a === '100.0') {
                return '100';
            }
            if (a === '0.0') {
                return '0';
            }
            return a;
        });
        $(wt).text(str);
    });
    return $.xml();
}

/**
 * 表格上方段落特殊数字修改100.1、99.9等
 * @param {String} xml document.xml
 * @param {String} name 表格名称
 * @returns 
 */
function fixSpecialNumbers(xml, name) {
    const $ = loadXmlStr(xml);
    const $tbl = getTableByName($, name);
    if (!$tbl) {
        this.addLog(`表格${name}未找到`);
        return xml;
    }
    
    // 你县的值
    const district4 = getTableCellText($tbl, 1, 2);
    const district8 = getTableCellText($tbl, 4, 2);

    // 你省的值
    const provicne4 = getTableCellText($tbl, 2, 2);
    const provicne8 = getTableCellText($tbl, 5, 2);

    // 全国的值
    const country4 = getTableCellText($tbl, 3, 2);
    const country8 = getTableCellText($tbl, 6, 2);

    const $wp = $tbl.prev().prev();
    const wpText = getWpAllText($wp);
    const textArr = wpText.split('；');
    // 四年级、八年级话术按分号分为两段
    if (textArr.length !== 2) {
        this.addLog(`表格${name}特殊数字问题(99.9,100.1等)，文字未匹配成功`);
        return xml;
    }

    // 处理四年级，只有在你县数据为0时才处理
    if (parseFloat(district4) == 0) {
        this.addLog(`表格${name}四年级你县数据为0`);
        let text = textArr[0];
        text = text.replace(/的比例为\d+\.*\d?%/, '的比例为100%');
        text = text.replace(/([低|高]于你省\d+\.*\d?个百分点)|与你省相同/, `高于你省${provicne4}个百分点`);
        text = text.replace(/([低|高]于全国\d+\.*\d?个百分点)|与全国相同/, `高于全国${country4}个百分点`);
        textArr[0] = text;
    }

    // 处理八年级，只有在你县数据为0时才处理
    if (parseFloat(district8) == 0) {
        this.addLog(`表格${name}八年级你县数据为0`);
        let text = textArr[1];
        text = text.replace(/的比例为\d+\.*\d?%/, '的比例为100%');
        text = text.replace(/([低|高]于你省\d+\.*\d?个百分点)|与你省相同/, `高于你省${provicne8}个百分点`);
        text = text.replace(/([低|高]于全国\d+\.*\d?个百分点)|与全国相同/, `高于全国${country8}个百分点`);
        textArr[1] = text;
    }
    writeToWpInSingleWr($wp, textArr.join('；'));
    return $.xml();
}

/**
 * 设置标题，取消勾选对齐到网格
 * @param {String} xml 文档
 */
function fixTitleCancelAlignGride(xml) {
    const $ = loadXmlStr(xml);
    const numPrList = $('w\\:numPr');
    numPrList.each((i, v) => {
        const ppr = v.parent;
        // <w:snapToGrid w:val="0" />
        $(ppr).find('w\\:snapToGrid').remove();
        $(v).after('<w:snapToGrid w:val="0" />');
    });
    return $.xml();
}

/**
 * 附录修改为黑体
 * @param {String} xml 
 * @returns 
 */
function fixFulu(xml) {
    const $ = loadXmlStr(xml);

    const $wp = getWpByText($, '附录');
    if (!$wp) {
        this.addLog('未匹配到附录');
        return xml;
    }
    
    $wp.find('w\\:r w\\:rPr w\\:rFonts').attr('w:ascii', '黑体');
    this.addLog('附录年份数字已修改为黑体');

    return $.xml();
}

/**
 * 故只呈现排在前两位存在的问题。去掉存在二字
 */
function fixFooteNotes() {
    const xmlPath = path.join(this.workspace, 'word/footnotes.xml');
    const $ = loadXmlFile(xmlPath);
    $('w\\:t').each((i, v) => {
        const text = $(v).text();
        if (text.indexOf('故只呈现排在前两位存在的问题。') >= 0) {
            $(v).text(text.replace('故只呈现排在前两位存在的问题。', '故只呈现排在前两位的问题。'));
        }
    });
    fs.writeFileSync(xmlPath, $.xml());
}

/**
 * 修改图表值周format
 * @param {String} xml document引用
 * @param {String} name 图表名称
 * @param {String} docPath 解压后的文档路径
 */
function fixChartCValCatFmt(xml, name, docPath) {
    const $ = loadXmlStr(xml);
    const chartPath = getChartPathByName(docPath, name, $);

    if (!chartPath) {
        this.addLog(`图表${name}未找到`);
        return false;
    }

    const $chart = loadXmlStr(fs.readFileSync(chartPath));
    $chart('c\\:valAx c\\:numFmt').attr('formatCode', 'General').attr('sourceLinked', '0');
    fs.writeFileSync(chartPath, $chart.xml());
}

/**
 * 表格列均分
 * @param {String} xml document.xml
 * @param {String} name 表格名称
 * @param {Array} gridColArr gridCol各列宽
 * @param {Array} cellWidthArr 二维数组，每行中各tc宽度
 * @returns 
 */
function fixTableJustify(xml, name, gridColArr=[], cellWidthArr=[]) {
    const $ = loadXmlStr(xml);
    const $tbl = getTableByName($, name);
    if (!$tbl) {
        this.addLog(`表格${name}未找到`);
        return xml;
    }
    
    $tbl.find('w\\:tblGrid w\\:gridCol').each((i, v) => {
        $(v).attr('w:w', gridColArr[i]);
    });

    $tbl.find('w\\:tr').each((trIndex, tr) => {
        const widthArr = cellWidthArr[trIndex] || cellWidthArr[cellWidthArr.length - 1];
        $(tr).find('w\\:tc').each((tcIndex, tc) => {
            $(tc).find('w\\:tcPr w\\:tcW').attr('w:w', widthArr[tcIndex]).attr('w:type', 'pct');
        });
    });
    this.addLog(`表格${name}已设置均分列`);
    return $.xml();
}

/**
 * 表格单元格改为多行
 * @param {String} xml document.xml
 * @param {String} name 表格名称
 * @param {Number} trIndex tr序号，从0开始
 * @param {Number} tcIndex tc序号，从0开始
 * @param {Array} splitArr 拆分后的单元格文字数组
 * @returns 
 */
function fixTableCellToMultiLinesByIndex(xml, name, trIndex, tcIndex, splitArr) {
    const $ = loadXmlStr(xml);
    const $tbl = getTableByName($, name);
    if (!$tbl) {
        this.addLog(`表格${name}未找到`);
        return xml;
    }
    const $tc = $tbl.find('w\\:tr').eq(trIndex).find('w\\:tc').eq(tcIndex);
    const $wp = $tc.find('w\\:p').eq(0).clone();
    const $wr = $wp.find('w\\:r').eq(0).clone();

    $wp.find('w\\:commentRangeStart').remove();
    $wp.find('w\\:commentRangeEnd').remove();
    $wp.find('w\\:commentReference').remove();
    
    $wp.find('w\\:r').remove();
    $tc.find('w\\:p').remove();

    splitArr.forEach(v => {
        const $_wp = $wp.clone();
        const $_wr = $wr.clone();
        $_wr.find('w\\:t').text(v);
        $_wp.append($_wr);
        $tc.append($_wp);
    });

    this.addLog(`表格${name}的单元格换行处理完成`);
    return $.xml();
}

/**
 * 散点图x轴辅助线对准刻度
 * 此方法目前内置了数学散点图的数据，如需修改其他报告，需核对参数！！！
 * @param {String} name 图表名称
 * @param {Object} $ document.xml引用
 * @param {Object} values 值
 * @returns 
 */
function fixScatterGuidelines(name, $, values) {
    // [
    //     {
    //         eq: 0,
    //         value: 100
    //     },
    //     {
    //         eq: 0,
    //         value: 100
    //     },
    // ]
    const chartPath = getChartPathByName(this.workspace, name, $);
    if (!chartPath) {
        this.addLog(`未找到图表${name}`);
        return false;
    }

    const drawingPath = getChartDrawingPathByChartPath(chartPath);
    if (!drawingPath) {
        this.addLog(`图表${name}没有辅助线`);
        return false;
    }

    const $drawing = loadXmlFile(drawingPath);

    const $relSizeAnchor = $drawing('cdr\\:relSizeAnchor');
    values.forEach(v => {
        $relSizeAnchor.eq(v.eq).find('cdr\\:x').text(v.value);
    });
    // 竖直辅助线
    // 2,3,8，左中右线的cdr:relSizeAnchor序号
    // +0.00266
    // // 0.26766  0.265
    // $relSizeAnchor.eq(2).find('cdr\\:x').text('0.26766');
    // // 0.33169  0.32903
    // $relSizeAnchor.eq(3).find('cdr\\:x').text('0.33169');
    // // 0.39572  0.39306
    // $relSizeAnchor.eq(8).find('cdr\\:x').text('0.39572');

    fs.writeFileSync(drawingPath, $drawing.xml());
    this.addLog(`图表${name}辅助线已调整`);
}

/**
 * 演绎推理能力不加粗
 * @param {String} xml document.xml
 * @returns 
 */
function fixYytlnl(xml) {
    const $ = loadXmlStr(xml);
    const $wt = getWtByText($, '演绎推理能力');
    if (!$wt) {
        this.addLog('演绎推理能力未找到');
        return xml;
    }

    const wr = $wt.parent();
    wr.find('w\\:rPr w\\:b').remove();

    return $.xml();
}

/**
 * 修改表格单元格文字
 * @param {String} xml document.xml
 * @param {String} name 表格名称
 * @param {Number} trIndex tr序号，从0开始
 * @param {Number} tcIndex tc序号，从0开始
 * @param {String} text 单元格文字
 * @returns 
 */
function changeTableCellText(xml, name, trIndex, tcIndex, text) {
    const $ = loadXmlStr(xml);
    const $tbl = getTableByName($, name);
    if (!$tbl) {
        this.addLog(`表格${name}未找到`);
        return xml;
    }
    const $tc = $tbl.find('w\\:tr').eq(trIndex).find('w\\:tc').eq(tcIndex);
    
    const $wp = $tc.find('w\\:p').eq(0).clone();
    const $wr = $wp.find('w\\:r').eq(0).clone();
    $wp.find('w\\:r').remove();
    $tc.find('w\\:p').remove();

    $wr.find('w\\:t').text(text);
    $wp.append($wr);

    $wp.find('w\\:commentRangeStart').remove();
    $wp.find('w\\:commentRangeEnd').remove();
    $wp.find('w\\:commentReference').remove();

    $tc.append($wp);

    this.addLog(`表格${name}的文字修改完成`);
    return $.xml();
}

/**
 * 重设目录段前段后间距
 * @param {String} xml document.xml
 * @param {Number} beforeLines 段前
 * @param {Number} afterLines 断后
 * @returns 
 */
function resetCatalogLineSpacing(xml, beforeLines, afterLines) {
    const $ = loadXmlStr(xml);

    const hyperLinkList = $('w\\:hyperlink');
    if (beforeLines || afterLines) {
        const beforeSpace = parseFloat(beforeLines) * 100;
        const afterSpace = parseFloat(afterLines) * 100;
        hyperLinkList.each((i, v) => {
            const $spacing = $(v).parent().find('w\\:pPr w\\:spacing');
            if (beforeLines) {
                $spacing.attr('w:beforeLines', beforeSpace);
            }
            if (afterLines) {
                $spacing.attr('w:afterLines', afterSpace);
            }
        });
    }

    this.addLog(`目录格式已调整为段前:${beforeLines},段后${afterLines}`);

    return $.xml();
}

/**
 * 重置x轴名称
 * @param {String} docPath 
 * @param {Object} $ 
 * @param {String} chartName 
 * @param {String} xAxisName 
 * @returns 
 */
function resetXAxisName(docPath, $, chartName, xAxisName) {
    if (!xAxisName) return;
    const chartPath = getChartPathByName(docPath, chartName, $);
    const chartExcelPath = getExcelPathByChartName(docPath, chartName, $);
    if (!chartPath || !chartExcelPath) {
        this.addLog(`未找到图表${chartName}`);
        return false;
    }

    // 修改xml
    const $chart = loadXmlStr(fs.readFileSync(chartPath));
    const $title = $chart('c\\:valAx c\\:title');
    $title.find('c\\:tx a\\:r:not(:first)').remove();
    const firstAr = $title.find('c\\:tx a\\:r:first');
    if (!firstAr.length) return;
    firstAr.find('a\\:t').html(xAxisName);

    fs.writeFileSync(chartPath, $chart.xml());
}

module.exports = {
    fix100_0and0_0,
    fixSpecialNumbers,
    fixTitleCancelAlignGride,
    fixFulu,
    fixFooteNotes,
    fixChartCValCatFmt,
    fixTableJustify,
    fixTableCellToMultiLinesByIndex,
    fixScatterGuidelines,
    fixYytlnl,
    changeTableCellText,
    replaceWpText,
    resetCatalogLineSpacing,
    renameNumbering,
    resetAxisDuration,
    renameLegend,
    renameCValAxTitle,
    replaceWtText,
    setBoldForText,
    resetXAxisName
}