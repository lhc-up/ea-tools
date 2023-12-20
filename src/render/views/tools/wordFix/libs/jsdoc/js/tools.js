exports.moduleList = [
    {
        "type": "docs",
        "list": [
            {
                "comment": "/**\n * 把文件夹打包为Word文件\n * \n * @memberof Base\n * @param {String} docPath - 解压后的文档文件夹路径\n * @param {String} [destPath] - 可选，生成的docx文档地址\n * @returns {String} 压缩后的docx文档地址，如果destPath有效，则使用该地址，否则在docPath当前目录中生成\n */",
                "meta": {
                    "range": [
                        529,
                        1470
                    ],
                    "filename": "base.js",
                    "lineno": 28,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000045",
                        "name": "Base.pkg",
                        "type": "FunctionExpression",
                        "value": "pkg",
                        "paramnames": [
                            "docPath",
                            "destPath"
                        ]
                    },
                    "vars": {
                        "": null
                    }
                },
                "description": "把文件夹打包为Word文件",
                "memberof": "Base",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "解压后的文档文件夹路径",
                        "name": "docPath"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "optional": true,
                        "description": "可选，生成的docx文档地址",
                        "name": "destPath"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "压缩后的docx文档地址，如果destPath有效，则使用该地址，否则在docPath当前目录中生成"
                    }
                ],
                "name": "pkg",
                "longname": "Base.pkg",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 解压Word文件\n * \n * @memberof Base\n * @param {String} docPath - Word文件路径\n * @returns {String} 解压后的文档文件夹路径\n */",
                "meta": {
                    "range": [
                        1585,
                        2072
                    ],
                    "filename": "base.js",
                    "lineno": 67,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000167",
                        "name": "Base.unPkg",
                        "type": "FunctionExpression",
                        "value": "unPkg",
                        "paramnames": [
                            "docPath"
                        ]
                    },
                    "vars": {
                        "": null
                    }
                },
                "description": "解压Word文件",
                "memberof": "Base",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "Word文件路径",
                        "name": "docPath"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "解压后的文档文件夹路径"
                    }
                ],
                "name": "unPkg",
                "longname": "Base.unPkg",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 解析xml文件\n * \n * @memberof Base\n * @param {String} filePath - xml文件路径\n * @returns {Cheerio.Root} Cheerio.Root(extends Selector)\n * @example\n * ```js\n * const $ = loadXmlFile('filePath.xml');\n * $('w\\\\:p').text('test');\n * ```\n */",
                "meta": {
                    "range": [
                        2432,
                        2553
                    ],
                    "filename": "base.js",
                    "lineno": 105,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000249",
                        "name": "Base.loadXmlFile",
                        "type": "FunctionExpression",
                        "value": "loadXmlFile",
                        "paramnames": [
                            "filePath"
                        ]
                    }
                },
                "description": "解析xml文件",
                "memberof": "Base",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "xml文件路径",
                        "name": "filePath"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "Cheerio.Root"
                            ]
                        },
                        "description": "Cheerio.Root(extends Selector)"
                    }
                ],
                "examples": [
                    "```js\nconst $ = loadXmlFile('filePath.xml');\n$('w\\\\:p').text('test');\n```"
                ],
                "name": "loadXmlFile",
                "longname": "Base.loadXmlFile",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 解析xml字符串\n * \n * @memberof Base\n * @param {String} xml - xml字符串\n * @returns {Cheerio.Root} Cheerio.Root(extends Selector)\n * @see {@link loadXmlFile}\n */",
                "meta": {
                    "range": [
                        2715,
                        2807
                    ],
                    "filename": "base.js",
                    "lineno": 117,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000269",
                        "name": "Base.loadXmlStr",
                        "type": "FunctionExpression",
                        "value": "loadXmlStr",
                        "paramnames": [
                            "xml"
                        ]
                    }
                },
                "description": "解析xml字符串",
                "memberof": "Base",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "xml字符串",
                        "name": "xml"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "Cheerio.Root"
                            ]
                        },
                        "description": "Cheerio.Root(extends Selector)"
                    }
                ],
                "see": [
                    "{@link loadXmlFile}"
                ],
                "name": "loadXmlStr",
                "longname": "Base.loadXmlStr",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 递归获取文件夹中的文件，默认只取docx文件\n * \n * @memberof Base\n * @param {String} dirPath - 文件夹路径\n * @param {Array} [filters=['.docx']] - 可选，指定要获取的文件的后缀名，如.docx\n * @returns {Array} 文件路径列表\n */",
                "meta": {
                    "range": [
                        2990,
                        3640
                    ],
                    "filename": "base.js",
                    "lineno": 129,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000285",
                        "name": "Base.getFileList",
                        "type": "FunctionExpression",
                        "value": "getFileList",
                        "paramnames": [
                            "dirPath",
                            "filters"
                        ]
                    },
                    "vars": {
                        "fileList": "Base.getFileList~fileList",
                        "": null
                    }
                },
                "description": "递归获取文件夹中的文件，默认只取docx文件",
                "memberof": "Base",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文件夹路径",
                        "name": "dirPath"
                    },
                    {
                        "type": {
                            "names": [
                                "Array"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": "['.docx']",
                        "description": "可选，指定要获取的文件的后缀名，如.docx",
                        "name": "filters"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "Array"
                            ]
                        },
                        "description": "文件路径列表"
                    }
                ],
                "name": "getFileList",
                "longname": "Base.getFileList",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 二维数组行列转换\n * \n * @memberof Base\n * @param {Array} matrix - 二维数组\n * @returns {Array} 行列转置后的数组\n */",
                "meta": {
                    "range": [
                        3745,
                        3863
                    ],
                    "filename": "base.js",
                    "lineno": 154,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000378",
                        "name": "Base.transposeMatrix",
                        "type": "FunctionExpression",
                        "value": "transposeMatrix",
                        "paramnames": [
                            "matrix"
                        ]
                    },
                    "vars": {
                        "": null
                    }
                },
                "description": "二维数组行列转换",
                "memberof": "Base",
                "params": [
                    {
                        "type": {
                            "names": [
                                "Array"
                            ]
                        },
                        "description": "二维数组",
                        "name": "matrix"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "Array"
                            ]
                        },
                        "description": "行列转置后的数组"
                    }
                ],
                "name": "transposeMatrix",
                "longname": "Base.transposeMatrix",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 删除文件\n * \n * @memberof Base\n * @param {String} filePath - 文件地址\n */",
                "meta": {
                    "range": [
                        3938,
                        4021
                    ],
                    "filename": "base.js",
                    "lineno": 164,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000406",
                        "name": "Base.delFileSync",
                        "type": "FunctionExpression",
                        "value": "delFileSync",
                        "paramnames": [
                            "filePath"
                        ]
                    }
                },
                "description": "删除文件",
                "memberof": "Base",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文件地址",
                        "name": "filePath"
                    }
                ],
                "name": "delFileSync",
                "longname": "Base.delFileSync",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 根据图表名称找到与图表关联的excel路径\n * \n * @memberof Chart\n * @param {String} docPath - 文档文件夹\n * @param {String} chartName - 图表名称\n * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法\n * @returns {String} 图表关联的Excel文件路径\n */",
                "meta": {
                    "range": [
                        561,
                        841
                    ],
                    "filename": "chart.js",
                    "lineno": 27,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000451",
                        "name": "Chart.getExcelPathByChartName",
                        "type": "FunctionExpression",
                        "value": "getExcelPathByChartName",
                        "paramnames": [
                            "docPath",
                            "chartName",
                            "$",
                            "strict"
                        ]
                    },
                    "vars": {
                        "chartPath": "Chart.getExcelPathByChartName~chartPath"
                    }
                },
                "description": "根据图表名称找到与图表关联的excel路径",
                "memberof": "Chart",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文档文件夹",
                        "name": "docPath"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "图表名称",
                        "name": "chartName"
                    },
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否严格模式，若为true则使用===匹配，否则使用includes方法",
                        "name": "strict"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "图表关联的Excel文件路径"
                    }
                ],
                "name": "getExcelPathByChartName",
                "longname": "Chart.getExcelPathByChartName",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 根据图表chartN.xml文件路径找到对应的Excel文件路径\n * \n * @memberof Chart\n * @param {String} docPath - 文档文件夹\n * @param {String} chartPath - 图表chartN.xml文件路径\n * @returns {String} 图表关联的Excel文件路径\n */",
                "meta": {
                    "range": [
                        1029,
                        1618
                    ],
                    "filename": "chart.js",
                    "lineno": 41,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000488",
                        "name": "Chart.getExcelPathByChartPath",
                        "type": "FunctionExpression",
                        "value": "getExcelPathByChartPath",
                        "paramnames": [
                            "docPath",
                            "chartPath"
                        ]
                    },
                    "vars": {
                        "chartFileName": "Chart.getExcelPathByChartPath~chartFileName",
                        "relsPath": "Chart.getExcelPathByChartPath~relsPath",
                        "$rels": "Chart.getExcelPathByChartPath~$rels",
                        "excelName": "Chart.getExcelPathByChartPath~excelName",
                        "": null
                    }
                },
                "description": "根据图表chartN.xml文件路径找到对应的Excel文件路径",
                "memberof": "Chart",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文档文件夹",
                        "name": "docPath"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "图表chartN.xml文件路径",
                        "name": "chartPath"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "图表关联的Excel文件路径"
                    }
                ],
                "name": "getExcelPathByChartPath",
                "longname": "Chart.getExcelPathByChartPath",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 根据图表名称找到图表chart.xml文件路径，匹配到多个时只取第一个\n * \n * @memberof Chart\n * @param {String} docPath \n * @param {String} chartName \n * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法\n * @returns {String} 图表chartN.xml文件路径\n */",
                "meta": {
                    "range": [
                        1940,
                        2410
                    ],
                    "filename": "chart.js",
                    "lineno": 68,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000581",
                        "name": "Chart.getChartPathByName",
                        "type": "FunctionExpression",
                        "value": "getChartPathByName",
                        "paramnames": [
                            "docPath",
                            "chartName",
                            "$",
                            "strict"
                        ]
                    },
                    "vars": {
                        "$": "Chart.getChartPathByName~$",
                        "numberingWp": "Chart.getChartPathByName~numberingWp",
                        "$wp": "Chart.getChartPathByName~$wp",
                        "rId": "Chart.getChartPathByName~rId"
                    }
                },
                "description": "根据图表名称找到图表chart.xml文件路径，匹配到多个时只取第一个",
                "memberof": "Chart",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "name": "docPath"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "name": "chartName"
                    },
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否严格模式，若为true则使用===匹配，否则使用includes方法",
                        "name": "strict"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "图表chartN.xml文件路径"
                    }
                ],
                "name": "getChartPathByName",
                "longname": "Chart.getChartPathByName",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 根据rId获取chart.xml路径\n * \n * @memberof Chart\n * @param {String} docPath - 文档文件夹\n * @param {String|Number} rId document.xml中，图表的引用id\n * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @returns {String} 图表chartN.xml文件路径\n */",
                "meta": {
                    "range": [
                        2670,
                        3014
                    ],
                    "filename": "chart.js",
                    "lineno": 90,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000657",
                        "name": "Chart.getChartPathByRid",
                        "type": "FunctionExpression",
                        "value": "getChartPathByRid",
                        "paramnames": [
                            "docPath",
                            "rId",
                            "$"
                        ]
                    },
                    "vars": {
                        "$": "Chart.getChartPathByRid~$",
                        "$rels": "Chart.getChartPathByRid~$rels",
                        "rel": "Chart.getChartPathByRid~rel"
                    }
                },
                "description": "根据rId获取chart.xml路径",
                "memberof": "Chart",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文档文件夹",
                        "name": "docPath"
                    },
                    {
                        "type": {
                            "names": [
                                "String",
                                "Number"
                            ]
                        },
                        "description": "document.xml中，图表的引用id",
                        "name": "rId"
                    },
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "图表chartN.xml文件路径"
                    }
                ],
                "name": "getChartPathByRid",
                "longname": "Chart.getChartPathByRid",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 根据图表chart.xml路径找到drawing.xml路径\n * \n * @memberof Chart\n * @param {String} chartPath - 图表chartN.xml文件路径\n * @returns {String} 图表中的drawing.xml路径，如散点图中的辅助线\n */",
                "meta": {
                    "range": [
                        3178,
                        3762
                    ],
                    "filename": "chart.js",
                    "lineno": 104,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000719",
                        "name": "Chart.getChartDrawingPathByChartPath",
                        "type": "FunctionExpression",
                        "value": "getChartDrawingPathByChartPath",
                        "paramnames": [
                            "chartPath"
                        ]
                    },
                    "vars": {
                        "$chart": "Chart.getChartDrawingPathByChartPath~$chart",
                        "rId": "Chart.getChartDrawingPathByChartPath~rId",
                        "chartFileName": "Chart.getChartDrawingPathByChartPath~chartFileName",
                        "chartRelsPath": "Chart.getChartDrawingPathByChartPath~chartRelsPath",
                        "$rels": "Chart.getChartDrawingPathByChartPath~$rels",
                        "rel": "Chart.getChartDrawingPathByChartPath~rel",
                        "drawingTarget": "Chart.getChartDrawingPathByChartPath~drawingTarget"
                    }
                },
                "description": "根据图表chart.xml路径找到drawing.xml路径",
                "memberof": "Chart",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "图表chartN.xml文件路径",
                        "name": "chartPath"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "图表中的drawing.xml路径，如散点图中的辅助线"
                    }
                ],
                "name": "getChartDrawingPathByChartPath",
                "longname": "Chart.getChartDrawingPathByChartPath",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "",
                "meta": {
                    "range": [
                        3764,
                        3827
                    ],
                    "filename": "chart.js",
                    "lineno": 117,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000812",
                        "name": "Chart.renameCValAxTitle",
                        "type": "FunctionExpression",
                        "value": "renameCValAxTitle",
                        "paramnames": []
                    }
                },
                "undocumented": true,
                "name": "renameCValAxTitle",
                "longname": "Chart.renameCValAxTitle",
                "kind": "function",
                "memberof": "Chart",
                "scope": "static"
            },
            {
                "comment": "/**\n * 删除多余批注\n * \n * @memberof Comment\n * @param {String} xml - xml字符串\n * @returns {String} 删除批注后的xml字符串\n */",
                "meta": {
                    "range": [
                        278,
                        1357
                    ],
                    "filename": "comment.js",
                    "lineno": 22,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100000836",
                        "name": "Comment.removeExtraComments",
                        "type": "FunctionExpression",
                        "value": "removeExtraComments",
                        "paramnames": [
                            "xml"
                        ]
                    },
                    "vars": {
                        "$": "Comment.removeExtraComments~$",
                        "startIdSet": "Comment.removeExtraComments~startIdSet",
                        "endIdSet": "Comment.removeExtraComments~endIdSet",
                        "refIdSet": "Comment.removeExtraComments~refIdSet",
                        "commentRangeStartList": "Comment.removeExtraComments~commentRangeStartList",
                        "commentRangeEndList": "Comment.removeExtraComments~commentRangeEndList",
                        "commentReferenceList": "Comment.removeExtraComments~commentReferenceList",
                        "": null
                    }
                },
                "description": "删除多余批注",
                "memberof": "Comment",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "xml字符串",
                        "name": "xml"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "删除批注后的xml字符串"
                    }
                ],
                "name": "removeExtraComments",
                "longname": "Comment.removeExtraComments",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 获取脚注内容文件路径\n * \n * @memberof Footnote\n * @param {String} docPath - 文档文件夹\n * @returns {String} 脚注内容文件路径\n */",
                "meta": {
                    "range": [
                        363,
                        482
                    ],
                    "filename": "footnote.js",
                    "lineno": 24,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001038",
                        "name": "Footnote.getFootnotesPath",
                        "type": "FunctionExpression",
                        "value": "getFootnotesPath",
                        "paramnames": [
                            "docPath"
                        ]
                    }
                },
                "description": "获取脚注内容文件路径",
                "memberof": "Footnote",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文档文件夹",
                        "name": "docPath"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "脚注内容文件路径"
                    }
                ],
                "name": "getFootnotesPath",
                "longname": "Footnote.getFootnotesPath",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 根据脚注内容获取脚注id\n * \n * @memberof Footnote\n * @param {String} docPath - 文档文件夹\n * @param {String} text - 脚注内容\n * @param {Boolean} [strict=true] - 是否严格模式，若为true则使用===匹配，否则使用includes方法\n * @returns {String} 符合要求的脚注id\n */",
                "meta": {
                    "range": [
                        704,
                        1386
                    ],
                    "filename": "footnote.js",
                    "lineno": 37,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001054",
                        "name": "Footnote.getFootnoteIdByContent",
                        "type": "FunctionExpression",
                        "value": "getFootnoteIdByContent",
                        "paramnames": [
                            "docPath",
                            "text",
                            "strict"
                        ]
                    },
                    "vars": {
                        "xmlPath": "Footnote.getFootnoteIdByContent~xmlPath",
                        "$": "Footnote.getFootnoteIdByContent~$",
                        "footnoteId": "Footnote.getFootnoteIdByContent~footnoteId",
                        "text": "Footnote.getFootnoteIdByContent~text",
                        "": null
                    }
                },
                "description": "根据脚注内容获取脚注id",
                "memberof": "Footnote",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文档文件夹",
                        "name": "docPath"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "脚注内容",
                        "name": "text"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": true,
                        "description": "是否严格模式，若为true则使用===匹配，否则使用includes方法",
                        "name": "strict"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "符合要求的脚注id"
                    }
                ],
                "name": "getFootnoteIdByContent",
                "longname": "Footnote.getFootnoteIdByContent",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 根据脚注id获取脚注内容\n * \n * @memberof Footnote\n * @param {String} docPath - 文档文件夹\n * @param {String|Number} footnoteId - 脚注id\n * @returns {String} 脚注内容纯文本\n */",
                "meta": {
                    "range": [
                        1546,
                        1942
                    ],
                    "filename": "footnote.js",
                    "lineno": 64,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001179",
                        "name": "Footnote.getFootnoteContentById",
                        "type": "FunctionExpression",
                        "value": "getFootnoteContentById",
                        "paramnames": [
                            "docPath",
                            "footnoteId"
                        ]
                    },
                    "vars": {
                        "xmlPath": "Footnote.getFootnoteContentById~xmlPath",
                        "$": "Footnote.getFootnoteContentById~$",
                        "$footnote": "Footnote.getFootnoteContentById~$footnote",
                        "text": "Footnote.getFootnoteContentById~text",
                        "": null
                    }
                },
                "description": "根据脚注id获取脚注内容",
                "memberof": "Footnote",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文档文件夹",
                        "name": "docPath"
                    },
                    {
                        "type": {
                            "names": [
                                "String",
                                "Number"
                            ]
                        },
                        "description": "脚注id",
                        "name": "footnoteId"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "脚注内容纯文本"
                    }
                ],
                "name": "getFootnoteContentById",
                "longname": "Footnote.getFootnoteContentById",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 找到给定内容所在的段落（wp）\n * \n * @memberof Paragraph\n * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @param {String} text - 文本内容\n * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法\n * @param {Boolean} [trim=false] - 是否忽略空格，若为true，则会删除全部空格之后进行匹配\n * @param {Boolean} [catalog=false] - 是否包含目录\n * @returns {Cheerio} Cheerio实例，如果有多个的话，可以使用each方法进行遍历\n * @see {@link https://cheerio.js.org/docs/api/classes/Cheerio}\n */",
                "meta": {
                    "range": [
                        761,
                        1399
                    ],
                    "filename": "paragraph.js",
                    "lineno": 34,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001287",
                        "name": "Paragraph.getWpByText",
                        "type": "FunctionExpression",
                        "value": "getWpByText",
                        "paramnames": [
                            "$",
                            "text",
                            "strict",
                            "trim",
                            "catalog"
                        ]
                    },
                    "vars": {
                        "$": "Paragraph.getWpByText~$",
                        "wpList": "Paragraph.getWpByText~wpList",
                        "": null
                    }
                },
                "description": "找到给定内容所在的段落（wp）",
                "memberof": "Paragraph",
                "params": [
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文本内容",
                        "name": "text"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否严格模式，若为true则使用===匹配，否则使用includes方法",
                        "name": "strict"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否忽略空格，若为true，则会删除全部空格之后进行匹配",
                        "name": "trim"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否包含目录",
                        "name": "catalog"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "Cheerio"
                            ]
                        },
                        "description": "Cheerio实例，如果有多个的话，可以使用each方法进行遍历"
                    }
                ],
                "see": [
                    "{@link https://cheerio.js.org/docs/api/classes/Cheerio}"
                ],
                "name": "getWpByText",
                "longname": "Paragraph.getWpByText",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 获取wp中的所有文本\n * \n * @memberof Paragraph\n * @param {Cheerio} $wp - wp的Cheerio实例\n * @returns {String} wp标签中的所有文本\n */",
                "meta": {
                    "range": [
                        1521,
                        1706
                    ],
                    "filename": "paragraph.js",
                    "lineno": 60,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001393",
                        "name": "Paragraph.getWpAllText",
                        "type": "FunctionExpression",
                        "value": "getWpAllText",
                        "paramnames": [
                            "$wp"
                        ]
                    },
                    "vars": {
                        "wtList": "Paragraph.getWpAllText~wtList",
                        "": null
                    }
                },
                "description": "获取wp中的所有文本",
                "memberof": "Paragraph",
                "params": [
                    {
                        "type": {
                            "names": [
                                "Cheerio"
                            ]
                        },
                        "description": "wp的Cheerio实例",
                        "name": "$wp"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "wp标签中的所有文本"
                    }
                ],
                "name": "getWpAllText",
                "longname": "Paragraph.getWpAllText",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 找到给定内容所在的wt\n * \n * @memberof Paragraph\n * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @param {String} text - 文本内容\n * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法\n * @param {Boolean} [trim=false] - 是否忽略空格，若为true，则会删除全部空格之后进行匹配\n * @param {Boolean} [catalog=false] - TODO:是否包含目录\n * @returns {Cheerio} Cheerio实例，如果有多个的话，可以使用each方法进行遍历\n * @see {@link https://cheerio.js.org/docs/api/classes/Cheerio}\n */",
                "meta": {
                    "range": [
                        2176,
                        2635
                    ],
                    "filename": "paragraph.js",
                    "lineno": 79,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001434",
                        "name": "Paragraph.getWtByText",
                        "type": "FunctionExpression",
                        "value": "getWtByText",
                        "paramnames": [
                            "$",
                            "text",
                            "strict",
                            "trim",
                            "catalog"
                        ]
                    },
                    "vars": {
                        "$": "Paragraph.getWtByText~$",
                        "wtList": "Paragraph.getWtByText~wtList",
                        "": null
                    }
                },
                "description": "找到给定内容所在的wt",
                "memberof": "Paragraph",
                "params": [
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文本内容",
                        "name": "text"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否严格模式，若为true则使用===匹配，否则使用includes方法",
                        "name": "strict"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否忽略空格，若为true，则会删除全部空格之后进行匹配",
                        "name": "trim"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "TODO:是否包含目录",
                        "name": "catalog"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "Cheerio"
                            ]
                        },
                        "description": "Cheerio实例，如果有多个的话，可以使用each方法进行遍历"
                    }
                ],
                "see": [
                    "{@link https://cheerio.js.org/docs/api/classes/Cheerio}"
                ],
                "name": "getWtByText",
                "longname": "Paragraph.getWtByText",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 根据文字找到图表、表格、图片的wp\n * \n * @memberof Paragraph\n * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @param {String} text - 文本内容\n * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法\n * @param {Boolean} [trim=false] - 是否忽略空格，若为true，则会删除全部空格之后进行匹配\n * @returns {Cheerio} Cheerio实例，如果有多个的话，可以使用each方法进行遍历\n * @see {@link https://cheerio.js.org/docs/api/classes/Cheerio}\n */",
                "meta": {
                    "range": [
                        3061,
                        3629
                    ],
                    "filename": "paragraph.js",
                    "lineno": 105,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001524",
                        "name": "Paragraph.getNumberingByName",
                        "type": "FunctionExpression",
                        "value": "getNumberingByName",
                        "paramnames": [
                            "$",
                            "text",
                            "strict",
                            "trim"
                        ]
                    },
                    "vars": {
                        "numPrList": "Paragraph.getNumberingByName~numPrList",
                        "": null
                    }
                },
                "description": "根据文字找到图表、表格、图片的wp",
                "memberof": "Paragraph",
                "params": [
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文本内容",
                        "name": "text"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否严格模式，若为true则使用===匹配，否则使用includes方法",
                        "name": "strict"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否忽略空格，若为true，则会删除全部空格之后进行匹配",
                        "name": "trim"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "Cheerio"
                            ]
                        },
                        "description": "Cheerio实例，如果有多个的话，可以使用each方法进行遍历"
                    }
                ],
                "see": [
                    "{@link https://cheerio.js.org/docs/api/classes/Cheerio}"
                ],
                "name": "getNumberingByName",
                "longname": "Paragraph.getNumberingByName",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 往wp的一个wr中写入文字\n * \n * @memberof Paragraph\n * @param {Selector|Cheerio} $wp - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @param {String} text - 要写入的文字\n */",
                "meta": {
                    "range": [
                        3798,
                        4010
                    ],
                    "filename": "paragraph.js",
                    "lineno": 129,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001628",
                        "name": "Paragraph.writeToWpInSingleWr",
                        "type": "FunctionExpression",
                        "value": "writeToWpInSingleWr",
                        "paramnames": [
                            "$wp",
                            "text"
                        ]
                    },
                    "vars": {
                        "$wr": "Paragraph.writeToWpInSingleWr~$wr"
                    }
                },
                "description": "往wp的一个wr中写入文字",
                "memberof": "Paragraph",
                "params": [
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$wp"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "要写入的文字",
                        "name": "text"
                    }
                ],
                "name": "writeToWpInSingleWr",
                "longname": "Paragraph.writeToWpInSingleWr",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 设置段落缩进\n * \n * @memberof Paragraph\n * @param {Selector|Cheerio} $wp - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @param {Object} settings - 缩进设置\n * @param {Number} settings.rightChars - 右侧字符数\n * @param {Number} settings.leftChars - 左侧字符数\n */",
                "meta": {
                    "range": [
                        4267,
                        4678
                    ],
                    "filename": "paragraph.js",
                    "lineno": 146,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001674",
                        "name": "Paragraph.setWpIndent",
                        "type": "FunctionExpression",
                        "value": "setWpIndent",
                        "paramnames": [
                            "$wp",
                            ""
                        ]
                    },
                    "vars": {
                        "$ind": "Paragraph.setWpIndent~$ind"
                    }
                },
                "description": "设置段落缩进",
                "memberof": "Paragraph",
                "params": [
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$wp"
                    },
                    {
                        "type": {
                            "names": [
                                "Object"
                            ]
                        },
                        "description": "缩进设置",
                        "name": "settings"
                    },
                    {
                        "type": {
                            "names": [
                                "Number"
                            ]
                        },
                        "description": "右侧字符数",
                        "name": "settings.rightChars"
                    },
                    {
                        "type": {
                            "names": [
                                "Number"
                            ]
                        },
                        "description": "左侧字符数",
                        "name": "settings.leftChars"
                    }
                ],
                "name": "setWpIndent",
                "longname": "Paragraph.setWpIndent",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 加粗文字\n * \n * @memberof Paragraph\n * @param {String} xml - xml字符串\n * @param {String} text - 用于找到段落的文字，需保证唯一性\n * @param {Array} boldArr - 需要加粗的文字列表\n * @returns {String} 加粗后的xml字符串\n */",
                "meta": {
                    "range": [
                        5057,
                        6246
                    ],
                    "filename": "paragraph.js",
                    "lineno": 179,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001736",
                        "name": "Paragraph.setBoldForText",
                        "type": "FunctionExpression",
                        "value": "setBoldForText",
                        "paramnames": [
                            "xml",
                            "text",
                            "boldArr"
                        ]
                    },
                    "vars": {
                        "$": "Paragraph.setBoldForText~$",
                        "$wp": "Paragraph.setBoldForText~$wp",
                        "wpText": "Paragraph.setBoldForText~wpText",
                        "reg": "Paragraph.setBoldForText~reg",
                        "": null,
                        "identifier": "Paragraph.setBoldForText~identifier",
                        "textArr": "Paragraph.setBoldForText~textArr",
                        "wr": "Paragraph.setBoldForText~wr",
                        "boldWr": "Paragraph.setBoldForText~boldWr"
                    }
                },
                "description": "加粗文字",
                "memberof": "Paragraph",
                "params": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "xml字符串",
                        "name": "xml"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "用于找到段落的文字，需保证唯一性",
                        "name": "text"
                    },
                    {
                        "type": {
                            "names": [
                                "Array"
                            ]
                        },
                        "description": "需要加粗的文字列表",
                        "name": "boldArr"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "加粗后的xml字符串"
                    }
                ],
                "name": "setBoldForText",
                "longname": "Paragraph.setBoldForText",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 根据名称查找表格\n * \n * @memberof Table\n * @param {Selector|Cheerio} $ - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @param {String} text - 文本内容\n * @param {Boolean} [strict=false] - 是否严格模式，若为true则使用===匹配，否则使用includes方法\n * @param {Boolean} [trim=false] - 是否忽略空格，若为true，则会删除全部空格之后进行匹配\n * @returns {Cheerio} Cheerio实例，如果有多个的话，可以使用each方法进行遍历\n * @see {@link https://cheerio.js.org/docs/api/classes/Cheerio}\n */",
                "meta": {
                    "range": [
                        586,
                        831
                    ],
                    "filename": "table.js",
                    "lineno": 26,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100001972",
                        "name": "Table.getTableByName",
                        "type": "FunctionExpression",
                        "value": "getTableByName",
                        "paramnames": [
                            "$",
                            "text",
                            "strict",
                            "trim"
                        ]
                    },
                    "vars": {
                        "numberingWp": "Table.getTableByName~numberingWp",
                        "": null
                    }
                },
                "description": "根据名称查找表格",
                "memberof": "Table",
                "params": [
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$"
                    },
                    {
                        "type": {
                            "names": [
                                "String"
                            ]
                        },
                        "description": "文本内容",
                        "name": "text"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否严格模式，若为true则使用===匹配，否则使用includes方法",
                        "name": "strict"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否忽略空格，若为true，则会删除全部空格之后进行匹配",
                        "name": "trim"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "Cheerio"
                            ]
                        },
                        "description": "Cheerio实例，如果有多个的话，可以使用each方法进行遍历"
                    }
                ],
                "see": [
                    "{@link https://cheerio.js.org/docs/api/classes/Cheerio}"
                ],
                "name": "getTableByName",
                "longname": "Table.getTableByName",
                "kind": "function",
                "scope": "static"
            },
            {
                "comment": "/**\n * 获取表格指定单元格内容\n * \n * @memberof Table\n * @param {Selector|Cheerio} $tbl - Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例\n * @param {Number} trIndex - 行索引，从0开始\n * @param {Number} tcIndex - 列索引，从0开始\n * @param {Boolean} [toNumber=false] - 是否转换为数字\n * @returns {String|Number} 单元格内容\n */",
                "meta": {
                    "range": [
                        1119,
                        1410
                    ],
                    "filename": "table.js",
                    "lineno": 43,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {
                        "id": "astnode100002016",
                        "name": "Table.getTableCellText",
                        "type": "FunctionExpression",
                        "value": "getTableCellText",
                        "paramnames": [
                            "$tbl",
                            "trIndex",
                            "tcIndex",
                            "toNumber"
                        ]
                    },
                    "vars": {
                        "$tc": "Table.getTableCellText~$tc",
                        "text": "Table.getTableCellText~text"
                    }
                },
                "description": "获取表格指定单元格内容",
                "memberof": "Table",
                "params": [
                    {
                        "type": {
                            "names": [
                                "Selector",
                                "Cheerio"
                            ]
                        },
                        "description": "Selector(由loadXmlFile或loadXmlStr得到)或者Cheerio实例",
                        "name": "$tbl"
                    },
                    {
                        "type": {
                            "names": [
                                "Number"
                            ]
                        },
                        "description": "行索引，从0开始",
                        "name": "trIndex"
                    },
                    {
                        "type": {
                            "names": [
                                "Number"
                            ]
                        },
                        "description": "列索引，从0开始",
                        "name": "tcIndex"
                    },
                    {
                        "type": {
                            "names": [
                                "Boolean"
                            ]
                        },
                        "optional": true,
                        "defaultvalue": false,
                        "description": "是否转换为数字",
                        "name": "toNumber"
                    }
                ],
                "returns": [
                    {
                        "type": {
                            "names": [
                                "String",
                                "Number"
                            ]
                        },
                        "description": "单元格内容"
                    }
                ],
                "name": "getTableCellText",
                "longname": "Table.getTableCellText",
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
                    "lineno": 8,
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
            },
            {
                "comment": "/**\n * @file 图表操作相关方法\n * @author haoluo2\n * @version 1.0.0\n */",
                "meta": {
                    "filename": "chart.js",
                    "lineno": 5,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {}
                },
                "name": "chart.js",
                "kind": "file",
                "description": "图表操作相关方法",
                "preserveName": true,
                "author": [
                    "haoluo2"
                ],
                "version": "1.0.0",
                "longname": "chart.js",
                "scope": "global"
            },
            {
                "comment": "/**\n * @file 批注操作相关方法\n * @author haoluo2\n * @version 1.0.0\n */",
                "meta": {
                    "filename": "comment.js",
                    "lineno": 3,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {}
                },
                "name": "comment.js",
                "kind": "file",
                "description": "批注操作相关方法",
                "preserveName": true,
                "author": [
                    "haoluo2"
                ],
                "version": "1.0.0",
                "longname": "comment.js",
                "scope": "global"
            },
            {
                "comment": "/**\n * @file 脚注操作相关方法\n * @author haoluo2\n * @version 1.0.0\n */",
                "meta": {
                    "filename": "footnote.js",
                    "lineno": 5,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {}
                },
                "name": "footnote.js",
                "kind": "file",
                "description": "脚注操作相关方法",
                "preserveName": true,
                "author": [
                    "haoluo2"
                ],
                "version": "1.0.0",
                "longname": "footnote.js",
                "scope": "global"
            },
            {
                "comment": "/**\n * @file 段落操作相关方法\n * @author haoluo2\n * @version 1.0.0\n */",
                "meta": {
                    "filename": "paragraph.js",
                    "lineno": 3,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {}
                },
                "name": "paragraph.js",
                "kind": "file",
                "description": "段落操作相关方法",
                "preserveName": true,
                "author": [
                    "haoluo2"
                ],
                "version": "1.0.0",
                "longname": "paragraph.js",
                "scope": "global"
            },
            {
                "comment": "/**\n * @file 表格操作相关方法\n * @author haoluo2\n * @version 1.0.0\n */",
                "meta": {
                    "filename": "table.js",
                    "lineno": 3,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {}
                },
                "name": "table.js",
                "kind": "file",
                "description": "表格操作相关方法",
                "preserveName": true,
                "author": [
                    "haoluo2"
                ],
                "version": "1.0.0",
                "longname": "table.js",
                "scope": "global"
            },
            {
                "comment": "/**\n * @file Test 基础操作相关方法\n * @author haoluo2\n * @version 1.0.0\n */",
                "meta": {
                    "filename": "test.js",
                    "lineno": 9,
                    "columnno": 0,
                    "path": "/Volumes/WORK/bnu/eaTools/ea-tools/src/render/views/tools/wordFix/libs/jsdoc/js",
                    "code": {}
                },
                "name": "test.js",
                "kind": "file",
                "description": "Test 基础操作相关方法",
                "preserveName": true,
                "author": [
                    "haoluo2"
                ],
                "version": "1.0.0",
                "longname": "test.js",
                "scope": "global"
            }
        ]
    }
];