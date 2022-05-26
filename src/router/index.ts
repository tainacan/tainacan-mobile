import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useWpStore } from '../store/storeWp'

import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import CollectionPage  from '../pages/CollectionPage.vue';
import CollectionsPage from '../pages/CollectionsPage.vue';
import ItemsPage from '../pages/ItemsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomePage,
    name: 'home'
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'login'
  },
  {
    path: '/collections/:id',
    component: CollectionPage,
    name: 'collection'
  },
  {
    path: '/collections',
    component: CollectionsPage,
    name: 'collections'
  },
  {
    path: '/items',
    component: ItemsPage,
    name: 'items'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from, next) => {
  const wpStore = useWpStore();
  await wpStore.checkUserLogin();
  if (to.name !== 'login' && !wpStore.userIsLoggedIn) next({ name: 'login' })
  else next()
})

export default router

