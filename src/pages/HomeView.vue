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
        <ion-button fill="clear" size="small" routerLink="/collectionsfull">
            Acessar lista completa de coleções
        </ion-button>
        <ion-list>
            <ion-list-header>
                Items
            </ion-list-header>
            <item-list></item-list>
            <ion-button fill="clear" size="small" routerLink="/itemsfull">
                Acessar lista completa de itens
            </ion-button>
        </ion-list>
    </base-layout>
</template>

<script>
import CollectionList from '@/components/CollectionList.vue';
import ItemList from '@/components/ItemList.vue';
import BaseLayout from '@/components/base/BaseLayout.vue';

import {
    useCollectionsStore
} from '../store/storeCollection';

import {
    IonButton,
    IonLoading,
    IonList,
    IonListHeader,
} from '@ionic/vue';

import { ref } from 'vue';

export default {
    components: {
        CollectionList,
        ItemList,
        BaseLayout,
        IonList,
        IonListHeader,
        IonButton,
        IonLoading
    },
    setup() {
        const isLoading = ref(false);
        const setOpen = (state) => isLoading.value = state;
        let collectionStore = useCollectionsStore();
        return { collectionStore, isLoading, setOpen }
    },
    async created(){
        this.setOpen(true);
        await this.collectionStore.fetchCollections("4", "modified");
        this.setOpen(false);
    },
}

</script>
