import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MuseumsLogin from '../pages/MuseumsLogin.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: MuseumsLogin
  },
  {
    path: '/collections',
    component: () => import('../pages/HomeCollectionItensList.vue') 
  },
  {
    path: '/collections/:id',
    component: () => import('../pages/ItemsListbyCollection.vue')
  },
  {
    path: '/collectionsitems',
    component: () => import('../pages/HomeCollectionItensList.vue')//mudar
  },
  {
    path: '/collectionsfull',
    component: () => import('../pages/ColletionsFullList.vue')
  },
  {
    path: '/itemsfull',
    component: () => import('../pages/ItemsFullList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
