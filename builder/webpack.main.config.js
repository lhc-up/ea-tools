const path = require('path');
const { dependencies } = require('../package.json');
module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: ['./src/main/main.ts']
    },
    output: {
        path: path.join(process.cwd(), 'app'),
        libraryTarget: 'commonjs2',
        filename: './[name].js'
    },
    optimization: {
        runtimeChunk: false,
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            }
        ]
    },
    externals: [
        ...Object.keys(dependencies || {})
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue', '.ts', '.tsx'],
        fallback: {
            url: require.resolve('url')
        },
        alias: {
            '@': path.resolve(__dirname, "../src"),
            '@config': path.resolve(__dirname, "../config")
        }
    },
    target: 'electron-main'
};