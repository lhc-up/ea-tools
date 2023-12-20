import { Tool } from '../tool';
import { routeList } from './router';

export class CommonUse extends Tool {
    constructor() {
        super({
            name: '常用工具',
            routeList,
            entry: routeList[0]
        });
    }
}

export const commonUse = new CommonUse();