import { defineStore } from 'pinia';
import axios from 'axios'; //substitui o fetch

const useCollectionsStore = defineStore('collections', {
    state () {
        return {
          collections: [],
          items: [],
          urlMuseum: '',
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
        
        async fetchItems(collectionId :string) {
            try {
              this.items = [];
              const response = await axios.get(`https://${this.urlMuseum}/wp-json/tainacan/v2/collection/${collectionId}/items?perpage=12&orderby=modified`);
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
