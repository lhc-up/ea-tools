import { createRouter, createWebHashHistory } from 'vue-router';
import { routerList } from './list';

// const __push = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(r) {
//     return __push.call(this, r).catch(err => err);
// }

const router = createRouter({
    history: createWebHashHistory(),
    routes: routerList
});

export default router;