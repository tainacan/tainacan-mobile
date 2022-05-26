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
            <collections-list :collections="collectionStore.collections"></collections-list>
        </ion-list>
        <ion-button fill="clear" size="small" routerLink="/collections">
            Acessar lista completa de coleções
        </ion-button>
        <ion-list>
            <ion-list-header>
                Items
            </ion-list-header>
            <items-list></items-list>
            <ion-button fill="clear" size="small" routerLink="/items">
                Acessar lista completa de itens
            </ion-button>
        </ion-list>
    </base-layout>
</template>

<script>
import CollectionsList from '@/components/lists/CollectionsList.vue';
import ItemsList from '@/components/lists/ItemsList.vue';
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
        CollectionsList,
        ItemsList,
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
