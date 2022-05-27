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
    </base-layout>
</template>

<script lang="ts">
import {
    useTainacanStore
} from '../store/storeTainacan';
import {
    IonLoading,
    IonRefresher,
    IonRefresherContent
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
        IonRefresherContent
    },
    setup() {
        const isLoading = ref(false);
        const setIsLoading = (state: boolean) => isLoading.value = state;

        const loadItems = async () => {
            await tainacanStore.fetchItems({ perPage: '24', orderBy: 'modified'});
        }
        const doRefresh = async (event: any) => {
            await loadItems();
            if (event && event.target)
                event.target.complete();
        }

        let tainacanStore = useTainacanStore();
        return {
            isLoading,
            setIsLoading,
            tainacanStore,
            doRefresh,
            loadItems
        }
    },

    async created(){
        this.setIsLoading(true)
        await this.loadItems();
        this.setIsLoading(false)
    },
}
</script>