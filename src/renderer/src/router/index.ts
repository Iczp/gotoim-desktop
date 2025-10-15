import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/home',
  // },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home/home.vue'),
    meta: { transition: 'fade' }, // 首页：淡入淡出
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Login.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/login/Login.vue'),
    meta: { transition: 'slide-left', depth: 1 }, // 关于页：向左滑动进入
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/login/Login.vue'),
    meta: { transition: 'zoom-in-out', depth: 1 }, // 联系页：缩放进入
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('@/pages/login/Login.vue'),
    meta: { transition: 'slide-left', depth: 2 }, // 产品详情：向左滑动进入 (比about更深一级)
  },
  {
    path: '/settings',
    name: 'contact',
    component: () => import('@/pages/login/Login.vue'),
    meta: { transition: 'slide-up' }, // 设置页：从底部弹出
  },
]

export default routes
