<template>
    <base-layout :page-title="$t('label_items_list')" page-default-back-link="/collections">
        <ion-loading
                :is-open="isLoading"
                :message="$t('label_loading')"
        >
        </ion-loading>
        <ion-toolbar>
             <ion-searchbar :placeholder="$t('label_search')" @ionChange="handleSearch($event)" @ionCancel="handleCancelSearch($event)"></ion-searchbar>
        </ion-toolbar>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <items-list :items="tainacanStore.items"></items-list>
        <ion-infinite-scroll ref="infiniteScroll" threshold="5%" @ionInfinite="loadItems">
            <ion-infinite-scroll-content>
            </ion-infinite-scroll-content>
        </ion-infinite-scroll>
    </base-layout>
</template>

<script lang="ts">
import {
    useTainacanStore
} from '../store/storeTainacan';
import {
    IonLoading,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScroll,
    IonToolbar,
    IonSearchbar
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { ref } from 'vue';
import ItemsList from '../components/lists/ItemsList.vue';
export default {
    components: {
        IonLoading,
        ItemsList,
        BaseLayout,
        IonRefresher,
        IonRefresherContent,
        IonInfiniteScroll,
        IonToolbar,
        IonSearchbar
    },
    setup() {
        const isLoading = ref(false);
        const search = ref();
        const setIsLoading = (state: boolean) => isLoading.value = state;
        const setSearch = (value: string) => search.value = value; 
        const infiniteScroll = ref();
        const loadItems = async (event: any, reset: boolean) => {
            await tainacanStore.fetchItems({ perPage: '12', orderBy: 'modified', reset: reset, search: search.value});
            let hasMoreItems = tainacanStore.totalItems && tainacanStore.totalItems !== 0;
            if (event && event.target)
                event.target.complete();
            if (!hasMoreItems){
                infiniteScroll.value.$el.disabled = true;
            }
        }
        const handleSearch = async (event: any) => {
            let search = event && event.detail && event.detail.value;
            if(search) {
                setSearch(search);
                await loadItems(null, true);
            } else {
                setSearch('');
            }
        }
        const handleCancelSearch = async (event: any) => {
            if (event.cancelable) {
                event.preventDefault();
            }
            loadItems(null, true);
        }
        const doRefresh = async (event: any) => {
            await loadItems({}, true);
            if (event && event.target){
                event.target.complete();
                infiniteScroll.value.$el.disabled = false;
            }
        }
        let tainacanStore = useTainacanStore();
        return {
            isLoading,
            setIsLoading,
            tainacanStore,
            doRefresh,
            loadItems,
            infiniteScroll,
            handleSearch,
            handleCancelSearch
        }
    },
    async created(){
        this.setIsLoading(true)
        await this.loadItems();
        this.setIsLoading(false)
    },
}
</script>