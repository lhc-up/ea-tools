import { BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron';
const process = require('process');
const url = require('url');
const path = require('path');
const EventEmitter = require('events');
const { devServer } = require('@config/index.js');
import * as remote from '@electron/remote/main';

const devMode = process.env.NODE_ENV === 'development';

export interface BaseWindowOptions {
    partition?: string;
    wwwroot?: string;
}

export class BaseWindow extends EventEmitter {
    window: BrowserWindow;
    wwwroot?: string;
    partition?: string;
    preloadJsPath: string;
    constructor(options?: BaseWindowOptions) {
        super();
        this.partition = options?.partition || '';
        this.wwwroot = options?.wwwroot || __dirname;
        this.preloadJsPath = path.join(this.wwwroot, 'preload.js');

        this.window = this.createWindow();
        this.addEventListenerToWin();
        this.addDevToolToWebcontent();
    }

    // 创建窗口
    private createWindow() {
        const config: BrowserWindowConstructorOptions = {
            title: 'EA-Tools',
            width: 1240,
            height: 720,
            minWidth: 1240,
            minHeight: 720,
            // backgroundColor: '#000',
            show: false,
            // titleBarStyle: 'hidden',
            webPreferences: {
                devTools: true, //是否打开调试模式
                webSecurity: false, //禁用安全策略
                nodeIntegrationInWorker: true,
                partition: this.partition,
                webviewTag: true,
                safeDialogs: true,
                safeDialogsMessage: '是否继续显示弹窗提示？',
                nodeIntegrationInSubFrames: true,
                allowRunningInsecureContent: true, //允许一个 https 页面运行 http url 里的资源
                preload: this.preloadJsPath, //预加载客户端js
                nodeIntegration: true, //5.x以上版本，默认无法在渲染进程引入node模块，需要这里设置为true
                contextIsolation: false //11.x以上版本，需要把此项设置为false，才可以在渲染进程使用node模块
            }
        };
        const window = new BrowserWindow(config);
        window.loadURL(this.getPageUrl());
        remote.enable(window.webContents);
        window.webContents.session.setCertificateVerifyProc((req, cb) => {
            // 不验证服务器证书
            cb(0);
        });
        window.once('ready-to-show', () => {
            window.show();
        });
        return window;
    }

    // 本地调试时，从devServer加载页面。打包后从本地文件加载页面。
    getPageUrl() {
        const fileUrl = url.pathToFileURL(path.join(this.wwwroot, 'index.html')).href;
        const { host, port } = devServer;
        const indexUrl = `http://${host}:${port}/index.html`;
        return devMode ? encodeURI(indexUrl) : fileUrl;
    }

    // 给窗口添加事件监听
    addEventListenerToWin() {
        // 监听关闭
        this.window.on('closed', () => {
            
        });
        // this.window.on('close', e => {
        //     app.hide();
        //     e.preventDefault();
        // });
    }

    // 给webContent添加调试器，之后可以使用webContents.openDevTools打开调试工具
    addDevToolToWebcontent() {
        const __debugger = this.window.webContents.debugger;
        try {
            if (__debugger.isAttached()) {
                __debugger.detach();
            }
            __debugger.attach('1.1');
            __debugger.sendCommand('Network.enable');
        } catch (err) {
            console.log('无法启动调试', err);
        }
    }

    getUrlHost(requestUrl: string){
        return url.parse(requestUrl).hostname;
    }
}