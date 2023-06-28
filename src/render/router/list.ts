export const routerList =  [
    {
        path: '/home.html',
        name: 'home',
        meta: {
            title: '首页',
            author: '--',
            parentRouter: '--'
        },
        component: () => import('../views/home.vue'),
        children: []
    }
];
