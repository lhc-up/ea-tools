import { Tool } from '../tool';
import { routerList } from './router';

export class WordFix extends Tool {
    constructor() {
        super({
            name: '刷报告',
            routerList,
            entry: routerList[0]
        });
    }
}

export const wordFix = new WordFix();