import { RouteRecordRaw } from 'vue-router';

export interface ToolOptions {
    routerList: RouteRecordRaw[];
    name: string;
    entry: RouteRecordRaw;
    icon?: string;
}

export class Tool {
    uid: Symbol;
    routerList: RouteRecordRaw[];
    name: string;
    entry: RouteRecordRaw;
    icon?: string;
    constructor(options: ToolOptions) {
        this.uid = Symbol();
        this.name = options.name;
        this.routerList = options.routerList;
        this.entry = options.entry;
        this.icon = options.icon;
    }
}