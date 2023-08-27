exports.moduleList = [
    {
        "type": "docs",
        "list": [
            {
                "comment": "/**\n * 把文件夹打包为Word文件\n * 此方法依赖node-archiver{@link https://github.com/archiverjs/node-archiver}\n * @requires https://github.com/archiverjs/node-archiver\n * @memberof base\n * @param docPath 解压后的文档文件夹路径\n * @param destPath 压缩后的docx文档地址\n * @returns 压缩后的docx文档地址，如果destPath有效，则使用该地址，否则使用`${docPath}.docx`\n */",
                "meta": {
                    "range": [
                        709,
                        1767
                    ],
                    "filename": "base.js",
                    "lineno": 23,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000067",
                        "name": "pkg",
                        "type": "FunctionDeclaration",
                        "paramnames": [
                            "docPath",
                            "destPath"
                        ]
                    },
                    "vars": {
                        "": null
                    }
                },
                "description": "把文件夹打包为Word文件\n此方法依赖node-archiver{@link https://github.com/archiverjs/node-archiver}",
                "requires": [
                    "module:https://github.com/archiverjs/node-archiver"
                ],
                "memberof": "base",
                "params": [
                    {
                        "description": "解压后的文档文件夹路径",
                        "name": "docPath"
                    },
                    {
                        "description": "压缩后的docx文档地址",
                        "name": "destPath"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "docPath"
                            ]
                        },
                        "description": "压缩后的docx文档地址，如果destPath有效，则使用该地址，否则使用`$.docx`"
                    }
                ],
                "name": "pkg",
                "longname": "base.pkg",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 解压Word文件\n * 此方法依赖adm-zip{@link https://github.com/cthackers/adm-zip}\n * @requires https://github.com/cthackers/adm-zip\n * @memberof base\n * @param docPath Word文件路径\n * @returns 解压后的文档文件夹路径\n */",
                "meta": {
                    "range": [
                        1986,
                        2497
                    ],
                    "filename": "base.js",
                    "lineno": 61,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000210",
                        "name": "unPkg",
                        "type": "FunctionDeclaration",
                        "paramnames": [
                            "docPath"
                        ]
                    },
                    "vars": {
                        "": null
                    }
                },
                "description": "解压Word文件\n此方法依赖adm-zip{@link https://github.com/cthackers/adm-zip}",
                "requires": [
                    "module:https://github.com/cthackers/adm-zip"
                ],
                "memberof": "base",
                "params": [
                    {
                        "description": "Word文件路径",
                        "name": "docPath"
                    }
                ],
                "returns": [
                    {
                        "description": "解压后的文档文件夹路径"
                    }
                ],
                "name": "unPkg",
                "longname": "base.unPkg",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 解析xml文件\n * @memberof base\n * @param filePath xml文件路径\n * @returns cheerio.Root，继承自Selector，选择器返回Cheerio\n */",
                "meta": {
                    "range": [
                        2756,
                        2970
                    ],
                    "filename": "base.js",
                    "lineno": 90,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000299",
                        "name": "loadXmlFile",
                        "type": "FunctionDeclaration",
                        "paramnames": [
                            "filePath"
                        ]
                    }
                },
                "description": "解析xml文件",
                "memberof": "base",
                "params": [
                    {
                        "description": "xml文件路径",
                        "name": "filePath"
                    }
                ],
                "returns": [
                    {
                        "description": "cheerio.Root，继承自Selector，选择器返回Cheerio"
                    }
                ],
                "name": "loadXmlFile",
                "longname": "base.loadXmlFile",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 解析xml字符串\n * @memberof base\n * @param xml xml字符串\n * @returns cheerio.Root，继承自Selector，选择器返回Cheerio\n */",
                "meta": {
                    "range": [
                        3115,
                        3282
                    ],
                    "filename": "base.js",
                    "lineno": 105,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000331",
                        "name": "loadXmlStr",
                        "type": "FunctionDeclaration",
                        "paramnames": [
                            "xml"
                        ]
                    }
                },
                "description": "解析xml字符串",
                "memberof": "base",
                "params": [
                    {
                        "description": "xml字符串",
                        "name": "xml"
                    }
                ],
                "returns": [
                    {
                        "description": "cheerio.Root，继承自Selector，选择器返回Cheerio"
                    }
                ],
                "name": "loadXmlStr",
                "longname": "base.loadXmlStr",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 递归获取文件夹中的文件，默认只取docx文件\n * @memberof base\n * @param dirPath 文件夹路径\n * @param filters 可选，指定要获取的文件的后缀名，如.docx\n * @returns 文件路径列表\n */",
                "meta": {
                    "range": [
                        3452,
                        4293
                    ],
                    "filename": "base.js",
                    "lineno": 121,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000357",
                        "name": "getFileList",
                        "type": "FunctionDeclaration",
                        "paramnames": [
                            "dirPath",
                            "filters"
                        ]
                    },
                    "vars": {
                        "fileList": "base.getFileList~fileList",
                        "": null
                    }
                },
                "description": "递归获取文件夹中的文件，默认只取docx文件",
                "memberof": "base",
                "params": [
                    {
                        "description": "文件夹路径",
                        "name": "dirPath"
                    },
                    {
                        "description": "可选，指定要获取的文件的后缀名，如.docx",
                        "name": "filters"
                    }
                ],
                "returns": [
                    {
                        "description": "文件路径列表"
                    }
                ],
                "name": "getFileList",
                "longname": "base.getFileList",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n *\n * @api\n * @memberof wrapper\n * @param a 测试\n * @returns void\n */",
                "meta": {
                    "range": [
                        173,
                        224
                    ],
                    "filename": "wrapper.js",
                    "lineno": 11,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000688",
                        "name": "unPkg",
                        "type": "FunctionDeclaration",
                        "paramnames": [
                            "a"
                        ]
                    }
                },
                "memberof": "wrapper",
                "params": [
                    {
                        "description": "测试",
                        "name": "a"
                    }
                ],
                "returns": [
                    {
                        "description": "void"
                    }
                ],
                "name": "unPkg",
                "longname": "wrapper.unPkg",
                "kind": "function",
                "scope": "static"
            }
        ]
    },
    {
        "type": "files",
        "list": [
            {
                "comment": "/**\n * @file 基础操作相关方法\n * @author haoluo2\n * @version 1.0.0\n */",
                "meta": {
                    "filename": "base.js",
                    "lineno": 9,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {}
                },
                "name": "base.js",
                "kind": "file",
                "description": "基础操作相关方法",
                "preserveName": true,
                "author": [
                    "haoluo2"
                ],
                "version": "1.0.0",
                "longname": "base.js",
                "scope": "global"
            }
        ]
    }
];