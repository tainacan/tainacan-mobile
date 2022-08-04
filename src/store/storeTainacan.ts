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
      nextItemsByCollectionPage: 1,
      items: [],
      nextItemsPage: 1,
      totalItems: 0,
      errorMessage: "",
      errorStatus: false
    };
  },

  actions: {
    async fetchCollections(params: { perPage: string, orderBy: string }) {
      try {
        const wpStore = useWpStore();

        let endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/collections?`;
        const authorization = (wpStore.userLogin && wpStore.userToken) ? ('Basic ' + btoa(wpStore.userLogin + ':' + wpStore.userToken)) : null;

        if (params && params.perPage)
          endpoint += '&perpage=' + params.perPage;
  
        if (params && params.orderBy)
          endpoint += '&orderby=' + params.orderBy;

        const response = await axios.get(endpoint, authorization ? {
          headers: {
            authorization: authorization
          }
        } : {});

        this.collections = response.data;
        this.totalCollections = response.headers['x-wp-total'];

      } catch (err) {
        this.collections = [];
        this.totalCollections = 0;
        this.errorMessage = "error_label_fetch_collections";
        this.errorStatus = true;
        // console.error("Collections loading error: ", err);
        return err;
      }
    },

    async fetchHomeCollections() {
      try {
        const wpStore = useWpStore();

        const endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/collections?perpage=4&orderby=modified`;
        const authorization = (wpStore.userLogin && wpStore.userToken) ? ('Basic ' + btoa(wpStore.userLogin + ':' + wpStore.userToken)) : null;

        const response = await axios.get(endpoint, authorization ? {
          headers: {
            authorization: authorization
          }
        } : {});

        this.homeCollections = response.data;
        this.totalHomeCollections = response.headers['x-wp-total'];

      } catch (err) {
        this.homeCollections = [];
        this.totalHomeCollections = 0;
        this.errorMessage = "error_label_fetch_collections";
        this.errorStatus = true;
        //console.error("Home collections loading error: ", err);
        return err;
      }
    },

    async fetchItemsByCollection(collectionId: string, params: { perPage: string, orderBy: string, reset?: boolean, search?: string }) {
      try {
        const wpStore = useWpStore();

        let endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/collection/${collectionId}/items?context=edit&fetch_only=id,title,thumbnail`;
        const authorization = (wpStore.userLogin && wpStore.userToken) ? ('Basic ' + btoa(wpStore.userLogin + ':' + wpStore.userToken)) : null;

        if (params && params.perPage)
          endpoint += '&perpage=' + params.perPage;
        else
          endpoint += '&perpage=12';
  
        if (params && params.orderBy)
          endpoint += '&orderby=' + params.orderBy;
        else
          endpoint += '&orderby=modified';

        if (params && params.search && params.search !== '')
          endpoint += '&search=' + params.search
          
        if (params.reset) {
          this.collectionItems = [];
          this.nextItemsByCollectionPage = 1;
        }

        endpoint += '&paged=' + this.nextItemsByCollectionPage;
  
        const response = await axios.get(endpoint, authorization ? {
          headers: {
            authorization: authorization
          }
        } : {});

        this.collectionItems.push(...response.data.items);
        this.totalCollectionItems = response.headers['x-wp-total'];

        if (this.totalCollectionItems && this.totalCollectionItems !== "0") {
            this.nextItemsByCollectionPage++;
        }    

      } catch (err) {
        this.collectionItems = [];
        this.totalCollectionItems = 0;
        this.nextItemsByCollectionPage = 1;
        this.errorMessage = "error_label_fetch_items_collections";
        this.errorStatus = true;
        //console.error("Items collections loading error: ", err);
        return false;
      }
    },

    async fetchHomeItems() {
      try {
        const wpStore = useWpStore();
        const endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/items?context=edit&fetch_only=id,title,thumbnail&perpage=12&orderby=modified`;
        const authorization = (wpStore.userLogin && wpStore.userToken) ? ('Basic ' + btoa(wpStore.userLogin + ':' + wpStore.userToken)) : null;

        const response = await axios.get(endpoint, authorization ? {
          headers: {
            authorization: authorization
          }
        } : {});

        this.homeItems = response.data.items;
        this.totalHomeItems = response.headers['x-wp-total'];
      
      } catch (err) {
        this.homeItems = [];
        this.totalHomeItems = 0;
        this.errorMessage = "error_label_fetch_items_collections";
        this.errorStatus = true;
        //console.error("Items collections loading error: ", err);
        return err;
      }
    },

    async fetchItems(params: { perPage: string, orderBy: string, reset?: boolean, search?: string }) {
      try {
        const wpStore = useWpStore();
        
        let endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/items?context=edit&fetch_only=id,title,thumbnail`;
        const authorization = (wpStore.userLogin && wpStore.userToken) ? ('Basic ' + btoa(wpStore.userLogin + ':' + wpStore.userToken)) : null;

        if (params && params.perPage)
          endpoint += '&perpage=' + params.perPage;

        if (params && params.orderBy)
          endpoint += '&orderby=' + params.orderBy;

          if (params && params.search && params.search !== '')
          endpoint += '&search=' + params.search
          
        if (params.reset) {
          this.items = [];
          this.nextItemsPage = 1;
        }

        endpoint += '&paged=' + this.nextItemsPage;

        const response = await axios.get(endpoint, authorization ? {
          headers: {
            authorization: authorization
          }
        } : {});
        
        this.items.push(...response.data.items);
        this.totalItems = response.headers['x-wp-total'];

        if (this.totalItems && this.totalItems !== "0") {
          this.nextItemsPage++;
        } 

      } catch (err) {
        this.items = [];
        this.totalItems = 0;
        this.nextItemsPage = 1;
        this.errorMessage = "error_label_fetch_items";
        this.errorStatus = true;
        //console.error("Items loading error: ", err);
        return err;
      }
    },

    async deleteItem(itemId: string|number) {
      try {
        const wpStore = useWpStore();
        
        const endpoint = `${wpStore.userSiteUrl}/wp-json/tainacan/v2/items/${itemId}`;
        const authorization = (wpStore.userLogin && wpStore.userToken) ? ('Basic ' + btoa(wpStore.userLogin + ':' + wpStore.userToken)) : null;

        const response = await axios.delete(endpoint, authorization ? {
          headers: {
            authorization: authorization
          }
        } : {});
        
        if (response.data && response.data.id) {
          
          const existingItemIndex = this.items.findIndex((anItem: any) => anItem.id == response.data.id);
          if (existingItemIndex >= 0)
            this.items.splice(existingItemIndex, 1);

          const existingHomeItemIndex = this.homeItems.findIndex((anItem: any) => anItem.id == response.data.id);
          if (existingHomeItemIndex >= 0)
            this.homeItems.splice(existingHomeItemIndex, 1);

          const existingCollectionItemIndex = this.collectionItems.findIndex((anItem: any) => anItem.id == response.data.id);
          if (existingCollectionItemIndex >= 0)
            this.collectionItems.splice(existingCollectionItemIndex, 1);
        }

      } catch (err) {
        //console.error("Erro ao deletar item:", err);
        this.errorMessage = "error_delete_item";
        this.errorStatus = true;

        return err;
      }
    }
  },
});
export { useTainacanStore };