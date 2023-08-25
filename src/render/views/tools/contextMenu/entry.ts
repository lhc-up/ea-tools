import { Tool } from '../tool';
import { routeList } from './router';

export class ContextMenu extends Tool {
    constructor() {
        super({
            name: '菜单',
            routeList,
            entry: routeList[0]
        });
    }
}

export const contextMenu = new ContextMenu();