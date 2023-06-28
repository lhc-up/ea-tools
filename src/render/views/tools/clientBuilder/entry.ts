import { Tool } from '../tool';
import { routerList } from './router';

export class ClientBuilder extends Tool {
    constructor() {
        super({
            name: '打包',
            routerList,
            entry: routerList[0]
        });
    }
}

export const clientBuilder = new ClientBuilder();