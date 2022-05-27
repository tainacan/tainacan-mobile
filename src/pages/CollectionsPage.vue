<template>
    <base-layout :page-title="$t('label_collections_list')" page-default-back-link="/">
        <ion-loading
                :is-open="isLoading"
                :message="$t('label_loading')"
        >
        </ion-loading>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-list>
            <collections-list :collections="tainacanStore.collections" :is-selection-mode="false"></collections-list>
        </ion-list>
    </base-layout>
</template>

<script lang="ts">
import CollectionsList from '@/components/lists/CollectionsList.vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import {
    IonLoading,
    IonList,
    IonRefresher,
    IonRefresherContent
} from '@ionic/vue';

import {
    useTainacanStore
} from '../store/storeTainacan';

import { ref } from 'vue';

export default {
    components: {
        CollectionsList,
        BaseLayout,
        IonLoading,
        IonList,
        IonRefresher,
        IonRefresherContent
    },
    setup() {
        const isLoading = ref(false);
        const setIsLoading = (state: boolean) => isLoading.value = state;
        
        const loadCollections = async () => {
            await tainacanStore.fetchCollections({ perPage: '24', orderBy: 'modified'});
        }
        const doRefresh = async (event: any) => {
            await loadCollections();
            if (event && event.target)
                event.target.complete();
        }

        let tainacanStore = useTainacanStore();
        
        return {
            tainacanStore,
            isLoading,
            setIsLoading,
            doRefresh,
            loadCollections
        }
    },
    async created(){
        this.setIsLoading(true);
        await this.loadCollections();
        this.setIsLoading(false);
    },
}

</script>
