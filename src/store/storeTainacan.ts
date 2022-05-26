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
    async fetchCollections(perPage: string, orderBy: string) {
      try {
        const wpStore = useWpStore();
        const response = await axios.get(
          `${wpStore.userSiteUrl}/wp-json/tainacan/v2/collections?${
            perPage ? "perpage=" + perPage : ""
          }&${orderBy ? "orderby=" + orderBy : ""}`
        );
        this.collections = response.data;
      } catch (err) {
        this.collections = [];
        console.error("Erro no carregamento das coleções:", err);
        return err;
      }
    },

    async fetchItemsByCollection(collectionId: string) {
      try {
        const wpStore = useWpStore();
        this.collectionItems = [];
        const response = await axios.get(
          `${wpStore.userSiteUrl}/wp-json/tainacan/v2/collection/${collectionId}/items?perpage=12&orderby=modified&fetch_only=id,title,thumbnail`
        );
        this.collectionItems = response.data.items;
      } catch (err) {
        this.collectionItems = [];
        console.error("Erro no carregamento dos items da coleção:", err);
        return err;
      }
    },

    async fetchItems() {
      try {
        const wpStore = useWpStore();
        this.items = [];
        const response = await axios.get(
          `${wpStore.userSiteUrl}/wp-json/tainacan/v2/items?perpage=12&orderby=modified&fetch_only=id,title,thumbnail`
        );
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
