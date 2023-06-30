import { app, Tray, Menu } from 'electron';
import { getResourcePath } from './utils';
// dock
export function initTray() {
    // const tray = new Tray(getResourcePath('tray/icon.png'));
    // const ctxMenu = Menu.buildFromTemplate([
    //     {
    //         label: 'Item1', type: 'radio'
    //     },
    //     {
    //         label: 'Item1', type: 'radio', click: (menu, win) => {
    //             console.log(menu)
    //             console.log(win)
    //         }
    //     }
    // ]);
    // tray.setTitle('This is my application.');
    // tray.on('click', () => {
    //     if (app.isHidden()) {
    //         app.show();
    //     } else {
    //         app.hide();
    //     }
    // });
    // tray.setContextMenu(ctxMenu);
    // tray.setToolTip('This is my application.');
}