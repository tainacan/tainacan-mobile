import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage' ; 

const store = new Storage();

const useWpStore = defineStore('wp', {
    state () {
        return {
            userIsLoggedIn: false,
            userSiteUrl: '',
            userLogin: '',
            userToken: ''
         }
      },

    actions: {
        async login(userSiteUrl: string, userLogin: string, userToken: string) {
          try {
            this.userIsLoggedIn = true;
            this.userSiteUrl = userSiteUrl;
            this.userLogin = userLogin;
            this.userToken = userToken;
            await store.set('userIsLoggedIn', true);
            await store.set('userSiteUrl', userSiteUrl);
            await store.set('userLogin', userLogin);
            await store.set('userToken', userToken);
          } catch (err) {
            this.userIsLoggedIn = false;
            this.userSiteUrl = '';
            this.userToken = '';
            this.userLogin = '';
            console.error('Erro no login:', err);
            return err;
          }
        },   
        async logoff() {
          try {
            this.userIsLoggedIn = false;
            this.userSiteUrl = '';
            this.userToken = '';
            this.userToken = '';
            await store.set('userIsLoggedIn', false);
            await store.set('userSiteUrl', '');
            await store.set('userToken', '');
          } catch (err) {
            this.userIsLoggedIn = false;
            this.userSiteUrl = '';
            this.userToken = '';
            this.userToken = '';
            console.error('Erro no logoff:', err);
            return err;
          }
        },  
       async checkUserLogin() {
          await store.create();
          this.userIsLoggedIn = await store.get('userIsLoggedIn');
          this.userSiteUrl = await store.get('userSiteUrl');
          this.userLogin = await store.get('userLogin');
          this.userToken = await store.get('userToken');
       }
    }
})
export {
    useWpStore
}
