import { RouteRecordRaw } from 'vue-router';

export const routeList: RouteRecordRaw[] = [
    {
        path: '/contextMenu.html',
        name: 'contextMenu',
        meta: {
            title: '菜单',
            author: '--',
            parentRouter: '--'
        },
        component: () => import('./index.vue'),
        children: []
    }
]