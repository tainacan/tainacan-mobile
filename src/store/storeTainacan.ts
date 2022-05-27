import { defineStore } from "pinia";
import axios from "axios";
import { useWpStore } from "./storeWp";

const useTainacanStore = defineStore("tainacan", {
  state() {
    return {
      collections: [],
      totalCollections: 0,
      collectionItems: [],
      totalCollectionItems: 0,
      items: [],
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

    async fetchItemsByCollection(collectionId: string, params: { perPage: string, orderBy: string }) {
      try {
        const wpStore = useWpStore();
        this.collectionItems = [];

        let endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/collection/${collectionId}/items?fetch_only=id,title,thumbnail`;

        if (params && params.perPage)
          endpoint += '&perpage=' + params.perPage;
  
        if (params && params.orderBy)
          endpoint += '&orderby=' + params.orderBy;

        const response = await axios.get(endpoint);

        this.collectionItems = response.data.items;
        this.totalCollectionItems = response.headers['x-wp-total'];

      } catch (err) {
        this.collectionItems = [];
        this.totalCollectionItems = 0;
        console.error("Erro no carregamento dos items da coleção:", err);

        return err;
      }
    },

    async fetchItems(params: { perPage: string, orderBy: string }) {
      try {
        const wpStore = useWpStore();
        this.items = [];
        
        let endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/items?fetch_only=id,title,thumbnail`;

        if (params && params.perPage)
          endpoint += '&perpage=' + params.perPage;
  
        if (params && params.orderBy)
          endpoint += '&orderby=' + params.orderBy;

        const response = await axios.get(endpoint);
        this.items = response.data.items;
        this.totalItems = response.headers['x-wp-total'];

      } catch (err) {
        this.items = [];
        this.totalItems = 0;
        console.error("Erro no carregamento dos items:", err);
        return err;
      }
    },
  },
});
export { useTainacanStore };
