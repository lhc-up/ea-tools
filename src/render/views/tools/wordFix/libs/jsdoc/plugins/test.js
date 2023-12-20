const docs = [], files = [];
console.log('__dirname', __dirname);
const fs = require('fs');
const path = require('path');
module.exports = {
    allowUnknownTags: true,
    defineTags(dict) {
        dict.defineTag('api', {
            onTagged: (doclet, tag) => {
                // console.log(doclet);
                // console.log(tag);
            }
        });
    },
    // hooks处理
    handlers: {
        newDoclet: ({ doclet }) => {
            if (doclet.kind === 'file') {
                files.push(doclet);
            }
            if (['Base', 'Chart', 'Comment', 'Footnote', 'Paragraph', 'Table'].includes(doclet.memberof)) {
                docs.push(doclet);
            } else {
                console.log(doclet);
            }
        },
        parseComplete: (({ sourcefiles, doclets }) => {
            const moduleList = [];
            moduleList.push({
                type: 'docs',
                list: docs
            });
            moduleList.push({
                type: 'files',
                list: files
            });
            const code = `exports.moduleList = ${JSON.stringify(moduleList, null, 4)};`;
            fs.writeFileSync(path.join(__dirname, '..', 'js/tools.js'), code);
        })
    }
}