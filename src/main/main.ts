
import { shortcut } from './libs/shortcut';
import { app, BrowserWindow, nativeTheme, globalShortcut, Menu, Tray } from 'electron';
import * as remote from '@electron/remote/main';
remote.initialize();

import { makeSingleInstance } from './libs/runCheck';
makeSingleInstance();

import { MainWindow } from './win/index';
import { initTray } from './libs/tray';

// 禁用硬件加速
app.disableHardwareAcceleration();
//注册全局变量
Object.assign(global, {
    // 页面跟路径配置，优先使用此配置，考虑到小版本更新时，版本之间的切换
    wwwroot: __dirname,
    // 区分不同域下的cookie
    cookie: {}
});

app.whenReady().then(() => {
    initTray();
    nativeTheme.themeSource = 'dark';
    //注册快捷键打开控制台事件
    shortcut.register('Command+Control+Alt+F5');
    new MainWindow();
});

app.on('window-all-closed', function () {
    setTimeout(() => {
        const allwindow = BrowserWindow.getAllWindows();
        if (allwindow.length === 0) app.exit(1);
    }, 500);
});

app.on('will-quit', function () {
    globalShortcut.unregisterAll()
});