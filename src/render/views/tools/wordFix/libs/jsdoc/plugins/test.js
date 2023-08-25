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
            if (['base', 'wrapper'].includes(doclet.memberof)) {
                docs.push(doclet);
            }
        },
        parseComplete: (({ sourcefiles, doclets }) => {
            const code = `
                exports.docs = ${JSON.stringify(docs, null, 4)};
                exports.files = ${JSON.stringify(files, null, 4)};
            `;
            fs.writeFileSync(path.join(__dirname, '..', 'js/tools.js'), code);
        })
    }
}