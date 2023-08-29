const { Base } = require('./base.js');

/**
 * @file 批注操作相关方法
 * @author haoluo2
 * @version 1.0.0
 */

/**
 * 批注操作相关方法
 * @namespace Comment
 */
exports.Comment = {};

/**
 * 删除多余批注
 * 
 * @memberof Comment
 * @param {String} xml - xml字符串
 * @returns {String} 删除批注后的xml字符串
 */
Comment.removeExtraComments = function removeExtraComments(xml) {
    const $ = Base.loadXmlStr(xml);
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