<template>
    <ion-loading
    :is-open="isOpenRef"
    cssClass="my-custom-class"
    message="Carregando..."
    >
    </ion-loading>
    <base-layout>
        <ion-toolbar>
            <ion-label>Coleções</ion-label>
        </ion-toolbar>
        <base-collection-list :collections="collectionStore.collections"></base-collection-list>
        <ion-button expand="block" routerLink="/collectionsfull">
            Acessar lista completa de coleções
        </ion-button>
        <ion-toolbar>
            <ion-label>Items</ion-label>
        </ion-toolbar>
        <base-item-list></base-item-list>
        <ion-button expand="block" routerLink="/itemsfull">
            Acessar lista completa de itens
        </ion-button>
    </base-layout>
</template>

<script>
import BaseCollectionList from '@/components/CollectionList.vue';
import BaseItemList from '@/components/ItemList.vue';
import BaseLayout from '@/components/base/BaseLayout.vue';

import {
    useCollectionsStore
} from '../store/storeCollection';

import {
    IonLabel,
    IonButton,
} from '@ionic/vue';

import { ref } from 'vue';

export default {
    components: {
        BaseCollectionList,
        BaseItemList,
        BaseLayout,
        IonLabel,
        IonButton,
    },
    setup() {
        const isOpenRef = ref(false);
        const setOpen = (state) => isOpenRef.value = state;
        let collectionStore = useCollectionsStore();
        return { collectionStore, isOpenRef, setOpen }
    },
    async created(){
        this.setOpen(true);
        await this.collectionStore.fetchCollections("4", "modified");
        this.setOpen(false);
    },
}

</script>
