import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import ColletionsList from '../pages/ColletionsList.vue';//futuro login

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/collections'
  },
  {
    path: '/collections',
    component: ColletionsList
  },
  {
    path: '/collections/:id',
    component: () => import('../pages/ItemsList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
