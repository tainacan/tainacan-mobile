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
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button>
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
            <ion-fab-list side="top" class="collection-page-actions">
                <ion-button size="small">Criar um novo item</ion-button>
                <ion-button size="small">Criar item com anexos selecionados</ion-button>
                <ion-button size="small">Criar itens a partir de uma seleção</ion-button>
            </ion-fab-list>
        </ion-fab>
    </base-layout>
</template>

<script lang="ts">
import {
    useTainacanStore
} from '../store/storeTainacan';
import { useRoute } from "vue-router";
import { ref } from 'vue';
import { add } from "ionicons/icons";

import {
    IonLoading,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonIcon,
    IonFabList
} from '@ionic/vue';

import BaseLayout from '@/components/base/BaseLayout.vue';
import ItemsList from '@/components/lists/ItemsList.vue';

export default {
    components: {
        BaseLayout,
        ItemsList,
        IonLoading,
        IonRefresher,
        IonRefresherContent,
        IonFab,
        IonIcon,
        IonFabList
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
            collectionId,
            add
        }
    },
    async created() {
        this.setIsLoading(true);
        await this.loadItemsByCollection();
        this.setIsLoading(false);
    },
}
</script>

<style>
.collection-page-actions {
    right: 0;
    align-items: flex-end;
}
</style>