import { Tool } from '../tool';
import { routeList } from './router';

export class ClientBuilder extends Tool {
    constructor() {
        super({
            name: '打包',
            routeList,
            entry: routeList[0]
        });
    }
}

export const clientBuilder = new ClientBuilder();