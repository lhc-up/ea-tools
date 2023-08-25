import { RouteRecordRaw } from 'vue-router';

export const routeList: RouteRecordRaw[] = [
    {
        path: '/wordFix/runTask.html',
        name: 'wordFix/runTask',
        meta: {
            title: '执行任务',
            author: '--',
            parentRouter: 'wordFix'
        },
        component: () => import('./pages/runTask.vue'),
        children: []
    },
    {
        path: '/wordFix.html',
        name: 'wordFix',
        meta: {
            title: '首页',
            author: '--',
            parentRouter: '--'
        },
        component: () => import('./index.vue'),
        children: []
    },
    {
        path: '/wordFix/addTask.html',
        name: 'wordFix/addTask',
        meta: {
            title: '添加任务',
            author: '--',
            parentRouter: 'wordFix'
        },
        component: () => import('./pages/addTask.vue'),
        children: []
    },
    
]