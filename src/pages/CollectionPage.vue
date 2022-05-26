<template>
    <base-layout page-title="Collection" page-default-back-link="/collections">
        <ion-loading
            :is-open="isLoading"
            message="Carregando..."
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

        let tainacanStore = useTainacanStore();

        return {
            isLoading,
            tainacanStore,
            setIsLoading,
            items: [],
            collectionId: route.params.id,
        }
    },
    async created() {
        this.setIsLoading(true)
        await this.tainacanStore.fetchItemsByCollection(this.collectionId)
        this.setIsLoading(false)
    },
}
</script>