import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from '../store/storeUser';

const useCollectionsStore = defineStore('collections', {
    state () {
        return {
          collections: [],
          items: [],
          siteUrl: '',
          userLogin: '',
          userPassword: '',
         }
      },

    actions: {
        async fetchCollections(perPage :string, orderBy :string) {
          try {
            const userStore = useUserStore();
            const response = await axios.get(`${userStore.userSiteUrl}/wp-json/tainacan/v2/collections?${perPage?"perpage="+perPage:""}&${orderBy?"orderby="+orderBy:""}`);
            this.collections = response.data;
          } catch (err) {
            this.collections = [];
            console.error('Erro no carregamento das coleções:', err);
            return err;
          }
        },
        
        async fetchItemsByCollection (collectionId :string) {
            try {
              const userStore = useUserStore();
              this.items = [];
              const response = await axios.get(`${userStore.userSiteUrl}/wp-json/tainacan/v2/collection/${collectionId}/items?perpage=12&orderby=modified&fetch_only=id,title,thumbnail`);
              this.items = response.data.items;
            } catch (err) {
              this.items = [];
              console.error('Erro no carregamento das coleções:', err);
              return err;
            }
          },

          async fetchItems() {
            try {
              const userStore = useUserStore();
              this.items = [];
              const response = await axios.get(`${userStore.userSiteUrl}/wp-json/tainacan/v2/items?perpage=12&orderby=modified&fetch_only=id,title,thumbnail`);
              this.items = response.data.items;
            } catch (err) {
              this.items = [];
              console.error('Erro no carregamento das coleções:', err);
              return err;
            }
          },

          async fetchFullItems() {
            try {
              const userStore = useUserStore();
              this.items = [];
              const response = await axios.get(`${userStore.userSiteUrl}/wp-json/tainacan/v2/items?perpage=20&orderby=modified&fetch_only=id,title,thumbnail`);
              this.items = response.data.items;
            } catch (err) {
              this.items = [];
              console.error('Erro no carregamento das coleções:', err);
              return err;
            }
          }
    }
})
export {
    useCollectionsStore
}
