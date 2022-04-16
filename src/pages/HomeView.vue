<template>
    <base-layout>
        <ion-toolbar>
            <ion-label>Coleções</ion-label>
        </ion-toolbar>
        <base-collection-list></base-collection-list>
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
    IonLabel,
    IonButton,
} from '@ionic/vue';

export default {
    components: {
        BaseCollectionList,
        BaseItemList,
        BaseLayout,
        IonLabel,
        IonButton,
    },
}
</script>
