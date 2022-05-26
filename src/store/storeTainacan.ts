import { defineStore } from "pinia";
import axios from "axios";
import { useWpStore } from "./storeWp";

const useTainacanStore = defineStore("tainacan", {
  state() {
    return {
      collections: [],
      collectionItems: [],
      items: [],
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

      } catch (err) {
        this.collections = [];

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

      } catch (err) {
        this.collectionItems = [];

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
      } catch (err) {
        this.items = [];
        console.error("Erro no carregamento dos items:", err);
        return err;
      }
    },
  },
});
export { useTainacanStore };
