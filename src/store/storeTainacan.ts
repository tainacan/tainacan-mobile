import axios from "axios";
import { defineStore } from "pinia";
import { useWpStore } from "./storeWp";

const useTainacanStore = defineStore("tainacan", {
  state() {
    return {
      homeCollections: [],
      totalHomeCollections: 0,
      homeItems: [],
      totalHomeItems: 0,
      collections: [],
      totalCollections: 0,
      collectionItems: [],
      totalCollectionItems: 0,
      nextCollectionsPage: 1,
      items: [],
      nextItemsPage: 1,
      totalItems: 0,
      siteUrl: "",
      userLogin: "",
      userPassword: "",
    };
  },

  actions: {
    async fetchCollections(params: { perPage: string, orderBy: string }) {
      try {
        const wpStore = useWpStore();

        let endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/collections?`;

        if (params && params.perPage)
          endpoint += '&perpage=' + params.perPage;
  
        if (params && params.orderBy)
          endpoint += '&orderby=' + params.orderBy;

        const response = await axios.get(endpoint);

        this.collections = response.data;
        this.totalCollections = response.headers['x-wp-total'];

      } catch (err) {
        this.collections = [];
        this.totalCollections = 0;
        console.error("Erro no carregamento das coleções:", err);

        return err;
      }
    },

    async fetchHomeCollections() {
      try {
        const wpStore = useWpStore();

        const endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/collections?perpage=4&orderby=modified`;

        const response = await axios.get(endpoint);

        this.homeCollections = response.data;
        this.totalHomeCollections = response.headers['x-wp-total'];

      } catch (err) {
        this.homeCollections = [];
        this.totalHomeCollections = 0;
        console.error("Erro no carregamento das coleções da home:", err);

        return err;
      }
    },

    async fetchItemsByCollection(collectionId: string, params: { perPage: string, orderBy: string, reset: boolean }) {
      try {
        const wpStore = useWpStore();

        let endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/collection/${collectionId}/items?fetch_only=id,title,thumbnail`;

        if (params && params.perPage)
          endpoint += '&perpage=' + params.perPage;
        else
          endpoint += '&perpage=12';
  
        if (params && params.orderBy)
          endpoint += '&orderby=' + params.orderBy;
        else
          endpoint += '&orderby=modified';
          
        if (params.reset) {
          this.collectionItems = [];
          this.nextCollectionsPage = 1;
        }

        endpoint += '&paged=' + this.nextCollectionsPage;
  
        const response = await axios.get(endpoint);

        this.collectionItems.push(...response.data.items);
        this.totalCollectionItems = response.headers['x-wp-total'];

        if (!this.totalCollectionItems ||
          this.totalCollectionItems === "0") {
          return false;
        } else {
          this.nextCollectionsPage++;
          return true;
        }    
      } catch (err) {
        this.collectionItems = [];
        this.totalCollectionItems = 0;
        this.nextCollectionsPage = 1;
        console.error("Erro no carregamento dos items da coleção:", err);

        return false;
      }
    },

    async fetchHomeItems() {
      try {
        const wpStore = useWpStore();
        
        const endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/items?fetch_only=id,title,thumbnail&perpage=12&orderby=modified`;

        const response = await axios.get(endpoint);
        this.homeItems = response.data.items;
        this.totalHomeItems = response.headers['x-wp-total'];

      } catch (err) {
        this.homeItems = [];
        this.totalHomeItems = 0;
        console.error("Erro no carregamento dos items da home:", err);
        return err;
      }
    },

    async fetchItems(params: { perPage: string, orderBy: string, reset: boolean }) {
      try {
        const wpStore = useWpStore();
        
        let endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/items?fetch_only=id,title,thumbnail`;

        if (params && params.perPage)
          endpoint += '&perpage=' + params.perPage;

        if (params && params.orderBy)
          endpoint += '&orderby=' + params.orderBy;

        if(params.reset){
          this.items = [];
          this.nextItemsPage = 1;
        }

        endpoint += '&paged=' + this.nextItemsPage;

        const response = await axios.get(endpoint);
        this.items.push(...response.data.items);
        this.totalItems = response.headers['x-wp-total'];

        if (!this.totalItems ||
          this.totalItems === "0") {
          return false;
        } else {
          this.nextItemsPage++;
          return true;
        } 

      } catch (err) {
        this.items = [];
        this.totalItems = 0;
        this.nextItemsPage = 1;
        console.error("Erro no carregamento dos items:", err);
        return err;
      }
    },
  },
});
export { useTainacanStore };