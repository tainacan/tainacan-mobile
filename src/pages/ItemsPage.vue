<template>
    <base-layout :page-title="$t('label_items_list')" page-default-back-link="/collections">
        <ion-loading
                :is-open="isLoading"
                :message="$t('label_loading')"
        >
        </ion-loading>
        <ion-toolbar>
             <ion-searchbar debounce="500" :placeholder="$t('label_search')" @ionChange="handleSearch($event)"></ion-searchbar>
        </ion-toolbar>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-spinner v-if="isSearching" name="bubbles"></ion-spinner>
        <div v-if="!isSearching && (!tainacanStore.totalItems || tainacanStore.totalItems == '0')" class="results-not-found">
            <span> {{$t('label_no_results_found')}} </span>
        </div>
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
    IonSearchbar,
    IonSpinner,
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
        IonSearchbar,
        IonSpinner,        
    },
    setup() {
        const isLoading = ref(false);
        const isSearching = ref(false)
        const search = ref();
        const setIsLoading = (state: boolean) => isLoading.value = state;
        const setIsSearching = (state: boolean) => isSearching.value = state;
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
        const cancelSearch = async () => {
            await loadItems(null, true);
        }
        const handleSearch = async (event: any) => {
            let search = event && event.detail && event.detail.value;
            
            setSearch(search);
            setIsSearching(true);

            if(search !== '') {
                await loadItems(null, true);
                setIsSearching(false);
            } else {
                await cancelSearch();
            }
            setIsSearching(false);
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
            isSearching,
            setIsLoading,
            tainacanStore,
            doRefresh,
            loadItems,
            infiniteScroll,
            handleSearch
        }
    },
    async created(){
        this.setIsLoading(true)
        await this.loadItems();
        this.setIsLoading(false)
    },
}
</script>