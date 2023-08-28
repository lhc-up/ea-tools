/**
 * @file 段落操作相关方法
 * @author haoluo2
 * @version 1.0.0
 */

function get$($) {
    if ($.find && $.find instanceof Function) {
        return $.find.bind($);
    }
    return $;
}

/**
 * 找到给定内容所在的段落（wp）
 * 
 * @memberof paragraph
 * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例
 * @param {String} text - 文本内容
 * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法
 * @param {Boolean} [trim=false] - 是否忽略空格，若为true，则会删除全部空格之后进行匹配
 * @param {Boolean} [catalog=false] - 是否包含目录
 * @returns {Cheerio} Cheerio实例，如果有多个的话，可以使用each方法进行遍历
 * @see {@link https://cheerio.js.org/docs/api/classes/Cheerio}
 */
exports.getWpListByText = function getWpListByText($, text, strict=false, trim=false, catalog=false) {
    $ = get$($);
    const wpList = $('w\\:p');
    return wpList.filter(i => {
        const wp = wpList.eq(i);
        // 处理目录中的文本
        if (!catalog && wp.find('w\\:hyperlink').length > 0) return false;
        let wpText = getWpAllText(wp);
        if (trim) {
            wpText = wpText.replace(/ /g, '');
        }
        // 严格匹配时，wpText必须和给定文本相等
        // 非严格匹配时，wpText包含给定文本
        const is = strict ? wpText === text : wpText.includes(text);
        return is;
    });
}

/**
 * 获取wp中的所有文本
 * 
 * @memberof paragraph
 * @param {Cheerio} $wp - wp的Cheerio实例
 * @returns {String} wp标签中的所有文本
 */
exports.getWpAllText = function getWpAllText($wp) {
    const wtList = $wp.find('w\\:t');
    return wtList.map(i => {
        return wtList.eq(i).text();
    }).join('');
}

/**
 * 找到给定内容所在的wt
 * 
 * @memberof paragraph
 * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例
 * @param {String} text - 文本内容
 * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法
 * @param {Boolean} [trim=false] - 是否忽略空格，若为true，则会删除全部空格之后进行匹配
 * @param {Boolean} [catalog=false] - TODO:是否包含目录
 * @returns {Cheerio} Cheerio实例，如果有多个的话，可以使用each方法进行遍历
 * @see {@link https://cheerio.js.org/docs/api/classes/Cheerio}
 */
exports.getWtListByText = function getWtListByText($, text, strict=false, trim=false, catalog=false) {
    $ = get$($);
    const wtList = $('w\\:t');
    return wtList.filter(i => {
        const wt = wtList.eq(i);
        let wtText = wt.text();
        if (trim) {
            wtText = wtText.replace(/ /g, '');
        }
        const is = strict ? wtText === text : wtText.includes(text);
        return is;
    });
}