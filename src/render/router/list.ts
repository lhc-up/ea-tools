export const routerList =  [
    {
        path: '/index.html',
        name: 'index',
        meta: {
            title: '首页',
            author: '--',
            parentRouter: '--'
        },
        component: () => import('../views/index.vue'),
        children: []
    }
];
