import { defineStore } from 'pinia';
import axios from 'axios';

const useCollectionsStore = defineStore('collections', {
    state () {
        return {
          collections: [],
          items: [],
          urlMuseum: '',
          userLogin: '',
          userPassword: '',
         }
      },

    actions: {
        async fetchCollections() {
          try {
            const response = await axios.get(`https://${this.urlMuseum}/wp-json/tainacan/v2/collections?perpage=4&orderby=modified`);
            this.collections = response.data;
          } catch (err) {
            this.collections = [];
            console.error('Erro no carregamento das coleções:', err);
            return err;
          }
        },
        async fetchFullCollections() {
          try {
            const response = await axios.get(`https://${this.urlMuseum}/wp-json/tainacan/v2/collections`);
            this.collections = response.data;
          } catch (err) {
            this.collections = [];
            console.error('Erro no carregamento das coleções:', err);
            return err;
          }
        },
        
        async fetchItems(collectionId :string) {
            try {
              this.items = [];
              const response = await axios.get(`https://${this.urlMuseum}/wp-json/tainacan/v2/collection/${collectionId}/items?perpage=12&orderby=modified&fetch_only=id,title,thumbnail`);
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
