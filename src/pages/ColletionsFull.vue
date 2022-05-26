<template>
    <ion-loading
            :is-open="isLoading"
            message="Carregando..."
    >
    </ion-loading>
    <base-layout>
        <ion-list>
            <ion-list-header>
                Coleções
            </ion-list-header>
            <collection-list :collections="collectionStore.collections"></collection-list>
        </ion-list>
    </base-layout>
</template>

<script>
import CollectionList from '@/components/CollectionList.vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { IonLoading, IonListHeader, IonList } from '@ionic/vue';

import {
    useCollectionsStore
} from '../store/storeCollection';

import { ref } from 'vue';

export default {
    components: {
        CollectionList,
        BaseLayout,
        IonLoading,
        IonList,
        IonListHeader
    },
    setup() {
        const isLoading = ref(false);
        const setOpen = (state) => isLoading.value = state;
        let collectionStore = useCollectionsStore();
        return { collectionStore, isLoading, setOpen }
    },
    async created(){
        this.setOpen(true);
        await this.collectionStore.fetchCollections();
        this.setOpen(false);
    },
}

</script>
