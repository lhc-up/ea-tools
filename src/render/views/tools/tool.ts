import { RouteRecordRaw } from 'vue-router';

export interface ToolOptions {
    routeList: RouteRecordRaw[];
    name: string;
    entry: RouteRecordRaw;
    icon?: string;
}

export class Tool {
    uid: Symbol;
    routeList: RouteRecordRaw[];
    name: string;
    entry: RouteRecordRaw;
    icon?: string;
    constructor(options: ToolOptions) {
        this.uid = Symbol(options.name);
        this.name = options.name;
        this.routeList = options.routeList;
        this.entry = options.entry;
        this.icon = options.icon;
    }
}