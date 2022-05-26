<template>
    <base-layout page-title="Items List" page-default-back-link="/collections">
        <ion-loading
                :is-open="isLoading"
                message="Carregando..."
        >
        </ion-loading>
        <items-list :items="collectionStore.items"></items-list>
    </base-layout>
</template>

<script lang="ts">
import {
    useCollectionsStore
} from '../store/storeCollection';
import {
    IonLoading
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { ref } from 'vue';

import ItemsList from '../components/lists/ItemsList.vue';

export default {
    components: {
        IonLoading,
        ItemsList,
        BaseLayout
    },
    setup() {
        const isLoading = ref(false);
        const setOpen = (state: boolean) => isLoading.value = state;
        let collectionStore = useCollectionsStore();
        return { isLoading, setOpen, collectionStore }
    },
    data() {
        return {
            items: [],
            collectionId: this.$route.params.id,
        };
    },

    async created(){
        this.setOpen(true)
        await this.collectionStore.fetchItems()
        this.setOpen(false)
    },
}
</script>