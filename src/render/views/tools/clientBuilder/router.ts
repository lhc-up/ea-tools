import { RouteRecordRaw } from 'vue-router';

export const routeList: RouteRecordRaw[] = [
    {
        path: '/clientBuilder.html',
        name: 'clientBuilder',
        meta: {
            title: '首页',
            author: '--',
            parentRouter: '--'
        },
        component: () => import('./index.vue'),
        children: []
    }
]