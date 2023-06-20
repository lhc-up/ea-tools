import { BaseWindow, BaseWindowOptions } from './baseWindow';
export interface MainWindowOptions extends BaseWindowOptions {

}
export class MainWindow extends BaseWindow {
    constructor(options?: MainWindowOptions) {
        super(options);
    }
}