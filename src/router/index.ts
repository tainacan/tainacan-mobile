import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '../store/storeUser'

import HomeView from '../pages/HomeView.vue';
import LoginForm from '../pages/LoginForm.vue';
import ItemsByCollection  from '../pages/ItemsByCollection.vue';
import CollectionsFull from '../pages/ColletionsFull.vue';
import ItemsFull from '../pages/ItemsFull.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/homeview'
  },
  {
    path: '/homeview',
    component: HomeView,
    name: 'homeview'
  },
  {
    path: '/loginform',
    component: LoginForm,
    name: 'loginform'
  },
  {
    path: '/itemsbycollection/:id',
    component: ItemsByCollection,
    name: 'itemsbycollection'
  },
  {
    path: '/collectionsfull',
    component: CollectionsFull,
    name: 'collectionsfull'
  },
  {
    path: '/itemsfull',
    component: ItemsFull,
    name: 'itemsfull'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from, next) => {
  const userStore = useUserStore();
  await userStore.checkUserLogin();
  if (to.name !== 'loginform' && !userStore.userIsLoggedIn) next({ name: 'loginform' })
  else next()
})

export default router

