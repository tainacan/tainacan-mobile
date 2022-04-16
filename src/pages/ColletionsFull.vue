<template>
    <base-layout page-title="Collections List">
    <ion-loading
    :is-open="isOpenRef"
    cssClass="my-custom-class"
    message="Carregando..."
    >
    </ion-loading>
        <ion-list>
            <ion-item v-for="collection of collectionStore.collections" :key="collection.id" :router-link="`/collections/${collection.id}`">
                <ion-thumbnail slot="start"> 
                    <ion-img v-if="collection.thumbnail.thumbnail[0]" :src="collection.thumbnail.thumbnail[0]" :alt="collection.name"></ion-img>
                    <ion-img v-else :src="image" :alt="collection.name"></ion-img>
                </ion-thumbnail>
                <ion-label> {{ collection.name }} </ion-label>
            </ion-item>
        </ion-list> 
    </base-layout>
</template>

<script lang="ts">
import {
    useCollectionsStore
} from '../store/storeCollection';
import {
    IonList,
    IonItem,
    IonImg,
    IonThumbnail,
    IonLoading,
    IonLabel,
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { computed, ref } from 'vue';
export default {
    components: {
        IonList,
        IonItem,
        IonImg,
        IonThumbnail,
        IonLabel,
        IonLoading,
        BaseLayout
    },
    setup() {
        const image = computed (() => require('../assets/placeholder_square_small.png'))
        const isOpenRef = ref(false);
        const setOpen = (state: boolean) => isOpenRef.value = state;
        let collectionStore = useCollectionsStore();
        return { image, isOpenRef, setOpen, collectionStore }
    },

    async created(){
        this.setOpen(true);
        await this.collectionStore.fetchFullCollections();
        this.setOpen(false);
    },
}
</script>

