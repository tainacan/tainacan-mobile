<template>
    <base-layout page-title="Collection" page-default-back-link="/collections">
        <ion-loading
            :is-open="isLoading"
            message="Carregando..."
        >
        </ion-loading>
        <items-list :items="collectionStore.collectionItems"></items-list>
    </base-layout>
</template>

<script lang="ts">
import {
    useCollectionsStore
} from '../store/storeCollection';
import { useRoute } from "vue-router";
import { ref } from 'vue';

import {
    IonLoading
} from '@ionic/vue';

import BaseLayout from '@/components/base/BaseLayout.vue';
import ItemsList from '@/components/lists/ItemsList.vue';

export default {
    components: {
        BaseLayout,
        ItemsList,
        IonLoading
    },
    setup() {
        const isLoading = ref(false);
        const setIsLoading = (state: boolean) => isLoading.value = state;
        const route = useRoute();

        let collectionStore = useCollectionsStore();

        return {
            isLoading,
            collectionStore,
            setIsLoading,
            items: [],
            collectionId: route.params.id,
        }
    },
    async created() {
        this.setIsLoading(true)
        await this.collectionStore.fetchItemsByCollection(this.collectionId)
        this.setIsLoading(false)
    },
}
</script>