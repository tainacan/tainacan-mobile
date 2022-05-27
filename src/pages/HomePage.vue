<template>
    <base-layout>
        <ion-loading
            :is-open="isLoading"
            :message="$t('label_loading')"
        >
        </ion-loading>
        <ion-list>
            <ion-list-header>
                {{ $t('collections') }}
            </ion-list-header>
            <collections-list :collections="tainacanStore.collections"></collections-list>
        </ion-list>
        <ion-button
                v-if="tainacanStore.collections.length < tainacanStore.totalCollections"
                fill="clear"
                size="small"
                routerLink="/collections">
            {{ $t('label_view_all_collections', [tainacanStore.totalCollections]) }}
        </ion-button>
        <ion-list>
            <ion-list-header>
                {{ $t('items') }}
            </ion-list-header>
            <items-list :items="tainacanStore.items"></items-list>
            <ion-button 
                    v-if="tainacanStore.items.length < tainacanStore.totalItems"
                    fill="clear"
                    size="small"
                    routerLink="/items">
                {{ $t('label_view_all_items', [tainacanStore.totalItems]) }}
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
    IonListHeader
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
        await this.tainacanStore.fetchCollections({ perPage: "4", orderBy: "modified" });
        await this.tainacanStore.fetchItems();
        this.setIsLoading(false);
    }
}

</script>
