import { RouteRecordRaw } from 'vue-router';

export const routeList: RouteRecordRaw[] = [
    {
        path: '/commonUse.html',
        name: 'commonUse',
        meta: {
            title: '首页',
            author: '--',
            parentRouter: '--'
        },
        component: () => import('./index.vue'),
        children: []
    }
]