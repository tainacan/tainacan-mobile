<template>
    <ion-loading
            :is-open="isLoading"
            message="Carregando..."
    >
    </ion-loading>
    <ion-card v-for="item of collectionStore.items" :key="item.id">
        <ion-card-title v-if="item.title"> {{ item.title }} </ion-card-title>
        <ion-card-title v-else>Item não possui título</ion-card-title>
        <ion-card-content>
             <ion-img :src="item.thumbnail.medium[0]" :alt="item.title"></ion-img>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import {
    useCollectionsStore
} from '../store/storeCollection';
import {
    IonCard,
    IonLoading,
    IonImg,
    IonCardTitle,
    IonCardContent
} from '@ionic/vue';

import { ref } from 'vue';
export default {
    components: {
        IonCard,
        IonLoading,
        IonImg,
        IonCardTitle,
        IonCardContent
    },
    setup() {
        const isLoading = ref(false);
        const setOpen = (state: boolean) => isLoading.value = state;
        let collectionStore = useCollectionsStore();
        return { isLoading, setOpen, collectionStore }
    },
    data() {
        return {
            items: [],
            collectionId: this.$route.params.id,
        };
    },

    async created(){
        this.setOpen(true)
        await this.collectionStore.fetchItems()
        this.setOpen(false)
    },
}
</script>