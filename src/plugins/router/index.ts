import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import useAccountStore from '@/stores/useAccountStore';

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
    beforeEnter(to, from, next) {
      const store = useAccountStore();

      if (store.isAuthorized) next();
      else next('/');
    },
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
