<template>
    <base-layout>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-loading
            :is-open="isLoading"
            :message="$t('label_loading')"
        >
        </ion-loading>
        <ion-list>
            <ion-list-header>
                {{ $t('label_last_modified_collections') }}
            </ion-list-header>
            <collections-list :collections="tainacanStore.homeCollections"></collections-list>
        </ion-list>
        <ion-button
                v-if="tainacanStore.homeCollections.length < tainacanStore.totalHomeCollections"
                fill="clear"
                size="small"
                routerLink="/collections">
            {{ $t('label_view_all_collections', [tainacanStore.totalHomeCollections]) }}
            <ion-icon
                slot="end"
                :icon="arrowForwardOutline"
            ></ion-icon>
        </ion-button>
        <ion-list>
            <ion-list-header>
                {{ $t('label_last_modified_items') }}
            </ion-list-header>
            <items-list :items="tainacanStore.homeItems"></items-list>
            <ion-button 
                    v-if="tainacanStore.homeItems.length < tainacanStore.totalHomeItems"
                    fill="clear"
                    size="small"
                    routerLink="/items">
                {{ $t('label_view_all_items', [tainacanStore.totalHomeItems]) }}
                <ion-icon
                    slot="end"
                    :icon="arrowForwardOutline"
                ></ion-icon>
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
import { arrowForwardOutline } from "ionicons/icons";
import {
    IonIcon,
    IonButton,
    IonLoading,
    IonList,
    IonListHeader,
    IonRefresher,
    IonRefresherContent
} from '@ionic/vue';

export default {
    components: {
        IonIcon,
        CollectionsList,
        ItemsList,
        BaseLayout,
        IonList,
        IonListHeader,
        IonButton,
        IonLoading,
        IonRefresher,
        IonRefresherContent
    },
    setup() {
        const isLoading = ref(false);
        const setIsLoading = (state: boolean) => isLoading.value = state;
        const loadCollectionsAndItems = async () => {
            await tainacanStore.fetchHomeCollections();
            await tainacanStore.fetchHomeItems();
        }
        const doRefresh = async (event: any) => {
            await loadCollectionsAndItems();
            if (event && event.target)
                event.target.complete();
        }

        let tainacanStore = useTainacanStore();

        return {
            arrowForwardOutline,
            tainacanStore,
            isLoading,
            setIsLoading,
            loadCollectionsAndItems,
            doRefresh
        }
    },
    async created() {
        this.setIsLoading(true);
        await this.loadCollectionsAndItems();
        this.setIsLoading(false);
    }
}

</script>
