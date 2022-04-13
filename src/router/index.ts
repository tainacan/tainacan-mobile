import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginForm from '../pages/LoginForm.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: LoginForm
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
