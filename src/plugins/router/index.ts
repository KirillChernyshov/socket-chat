import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Authorization',
    component: () => import('@/views/Authorization/Authorization.vue'),
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/Chat/Chat.vue'),
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
