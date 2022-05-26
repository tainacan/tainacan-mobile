<template>
    <base-layout>
        <ion-loading
            :is-open="isLoading"
            message="Carregando..."
        >
        </ion-loading>
        <ion-list>
            <ion-list-header>
                Coleções
            </ion-list-header>
            <collections-list :collections="tainacanStore.collections"></collections-list>
        </ion-list>
        <ion-button fill="clear" size="small" routerLink="/collections">
            Acessar lista completa de coleções
        </ion-button>
        <ion-list>
            <ion-list-header>
                Items
            </ion-list-header>
            <items-list :items="tainacanStore.items"></items-list>
            <ion-button fill="clear" size="small" routerLink="/items">
                Acessar lista completa de itens
            </ion-button>
        </ion-list>
    </base-layout>
</template>

<script lang="ts">
import {
    useTainacanStore
} from '../store/storeTainacan';
import { ref } from 'vue';

import CollectionsList from '@/components/lists/CollectionsList.vue';
import ItemsList from '@/components/lists/ItemsList.vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import {
    IonButton,
    IonLoading,
    IonList,
    IonListHeader,
} from '@ionic/vue';

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
        const setIsLoading = (state: boolean) => isLoading.value = state;

        let tainacanStore = useTainacanStore();

        return {
            tainacanStore,
            isLoading,
            setIsLoading
        }
    },
    async created() {
        this.setIsLoading(true);
        await this.tainacanStore.fetchCollections("4", "modified");
        await this.tainacanStore.fetchItems();
        this.setIsLoading(false);
    }
}

</script>
