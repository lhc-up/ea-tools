const path = require('path');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// 是否是调试模式
const devMode = process.env.NODE_ENV === 'development';
module.exports = {
    mode: process.env.NODE_ENV,
    devtool: devMode ? 'eval-source-map' : false,
    entry: {
        main: ['@babel/polyfill', './src/render/index.ts']
    },
    output: {
        path: path.join(__dirname, '../app/'),
        publicPath: devMode ? '/' : '',
        filename: './js/[name].[contenthash:8].js',
        globalObject: 'this'
    },
    optimization: {
        runtimeChunk: false,
        minimize: !devMode,
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendor: {
                    test: /node_modules\//,
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }
            },
            {
                test: /\.css$/,
                use: (devMode ? ['css-hot-loader'] : []).concat([
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ])
            },
            {
                test: /\.less$/,
                exclude: [/\.lazy\.less$/i],
                use: (devMode ? ['css-hot-loader'] : []).concat([
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ])
            },
            {
                test: /\.lazy\.less$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'lazySingletonStyleTag' }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(gif|svg|png|jpe?g|ico|hdr)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 2048,
                        name: './images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 2048,
                        name: './images/[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.ts', '.tsx'],
        fallback: {
            url: require.resolve('url')
        },
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@config': path.resolve(__dirname, '../config'),
            '@images': path.resolve(__dirname, '../src/render/libs/images')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/render/index.ejs',
            filename: './index.html',
            title: 'EA-Tools',
            inject: 'body',
            hash: false
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? `[name]-render.css` : `[name]-render.[contenthash:8].css`,
            chunkFilename: devMode ? '[name]-render.css' : '[name]-render.[contenthash:8].css',
            ignoreOrder: true
        }),
        new VueLoaderPlugin(),
        new ForkTsCheckerWebpackPlugin()
    ],
    target: 'electron-renderer'
}