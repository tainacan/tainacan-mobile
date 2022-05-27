<template>
    <base-layout :page-title="$t('collection')" page-default-back-link="/collections">
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-loading
            :is-open="isLoading"
            :message="$t('label_loading')"
        >
        </ion-loading>
        <items-list :items="tainacanStore.collectionItems"></items-list>
    </base-layout>
</template>

<script lang="ts">
import {
    useTainacanStore
} from '../store/storeTainacan';
import { useRoute } from "vue-router";
import { ref } from 'vue';

import {
    IonLoading,
    IonRefresher,
    IonRefresherContent
} from '@ionic/vue';

import BaseLayout from '@/components/base/BaseLayout.vue';
import ItemsList from '@/components/lists/ItemsList.vue';

export default {
    components: {
        BaseLayout,
        ItemsList,
        IonLoading,
        IonRefresher,
        IonRefresherContent
    },
    setup() {
        const isLoading = ref(false);
        const setIsLoading = (state: boolean) => isLoading.value = state;
        const route = useRoute();
        const collectionId = route.params.id + '';
        const loadItemsByCollection = async () => {
            await tainacanStore.fetchItemsByCollection(collectionId, { perPage: '24', orderBy: 'modified'});
        }
        const doRefresh = async (event: any) => {
            await loadItemsByCollection();
            if (event && event.target)
                event.target.complete();
        }

        let tainacanStore = useTainacanStore();

        return {
            isLoading,
            tainacanStore,
            setIsLoading,
            loadItemsByCollection,
            doRefresh,
            collectionId
        }
    },
    async created() {
        this.setIsLoading(true);
        await this.loadItemsByCollection();
        this.setIsLoading(false);
    },
}
</script>