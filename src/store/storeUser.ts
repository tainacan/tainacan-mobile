import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage' ; 

const store = new Storage();

const useUserStore = defineStore('users', {
    state () {
        return {
            userIsLoggedIn: false,
            userSiteUrl: '',
         }
      },

    actions: {
        async userLogin(userSiteUrl: string) {
          try {
            this.userIsLoggedIn = true;
            this.userSiteUrl = userSiteUrl;
            await store.set('userIsLoggedIn', true);
            await store.set('userSiteUrl', userSiteUrl);
          } catch (err) {
            this.userIsLoggedIn = false;
            await store.set('userIsLoggedIn', false);
            console.error('Erro no login:', err);
            return err;
          }
        },    
       async checkUserLogin() {
          await store.create();
          this.userIsLoggedIn = await store.get('userIsLoggedIn');
          this.userSiteUrl = await store.get('userSiteUrl');
       }
    }
})
export {
    useUserStore
}
