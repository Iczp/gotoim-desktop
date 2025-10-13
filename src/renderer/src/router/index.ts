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
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Login.vue'),
  },
]

export default routes
