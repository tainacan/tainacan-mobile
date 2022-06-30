<template>
    <base-layout :page-title="$t('label_items_list')" page-default-back-link="/collections">
        <ion-loading
                :is-open="isLoading"
                :message="$t('label_loading')"
        >
        </ion-loading>
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
    IonInfiniteScrollContent
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
        IonInfiniteScrollContent
    },
    setup() {
        const isLoading = ref(false);
        const setIsLoading = (state: boolean) => isLoading.value = state;
        const infiniteScroll = ref();
        const loadItems = async (event: any, reset: boolean) => {
            let hasMoreItems = await tainacanStore.fetchItems({ perPage: '12', orderBy: 'modified', reset: reset});
            if (event && event.target)
                event.target.complete();
            if (!hasMoreItems){
                infiniteScroll.value.$el.disabled = true;
            }
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
            infiniteScroll
        }
    },
    async created(){
        this.setIsLoading(true)
        await this.loadItems();
        this.setIsLoading(false)
    },
}
</script>