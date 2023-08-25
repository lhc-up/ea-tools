import { Tool } from '../tool';
import { routeList } from './router';

export class WordFix extends Tool {
    constructor() {
        super({
            name: '刷报告',
            routeList,
            entry: routeList[0]
        });
    }
}

export const wordFix = new WordFix();