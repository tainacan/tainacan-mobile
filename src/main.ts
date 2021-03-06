import { createApp } from 'vue'

import App from './App.vue'
import BaseLayout from './components/base/BaseLayout.vue';
import CollectionList from './components/lists/CollectionsList.vue';
import ItemList from './components/lists/ItemsList.vue';
import router from './router';
import { createPinia } from 'pinia';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/core.css'; //importei do arquivo criado

/* Translation */
import { createI18n } from 'vue-i18n';
import { translationStrings } from './locales/translation-strings';

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: translationStrings, // set locale messages
  })

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(createPinia())
  .use(i18n);

app.component('base-layout', BaseLayout);
app.component('base-collectionlist', CollectionList);
app.component('base-itemlist', ItemList);
  
router.isReady().then(() => {
  app.mount('#app');
});