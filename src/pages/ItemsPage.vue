<template>
    <base-layout page-title="Items List" page-default-back-link="/collections">
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
    </base-layout>
</template>

<script lang="ts">
import {
    useCollectionsStore
} from '../store/storeCollection';
import {
    IonCard,
    IonLoading,
    IonCardTitle,
    IonCardContent,
    IonImg
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { ref } from 'vue';
export default {
    components: {
        IonCard,
        IonLoading,
        BaseLayout,
        IonCardTitle,
        IonCardContent,
        IonImg
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
        await this.collectionStore.fetchFullItems()
        this.setOpen(false)
    },
}
</script>