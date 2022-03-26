<template>
    <base-layout page-title="Items List" page-default-back-link="/collections">
    <ion-loading
    :is-open="isOpenRef"
    cssClass="my-custom-class"
    message="Carregando..."
    >
    </ion-loading>
    <ion-item v-for="item of collectionsStore.items" :key="item.id">
        <ion-label v-if="item.title"> {{ item.title }} </ion-label>
        <ion-label v-else>Item não possui título</ion-label>
    </ion-item>
    </base-layout>
</template>

<script lang="ts">
import {
    useCollectionsStore
} from '../store/storeCollections';
import {
    IonItem,
    IonLabel,
    IonLoading,
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { ref } from 'vue';
export default {
    components: {
        IonItem,
        IonLabel,
        IonLoading,
        BaseLayout
    },
    setup() {
        const isOpenRef = ref(false);
        const setOpen = (state: boolean) => isOpenRef.value = state;
        let collectionsStore = useCollectionsStore();
        return { isOpenRef, setOpen, collectionsStore }
    },
    data() {
        return {
            items: [],
            collectionId: this.$route.params.id,
        };
    },

    async created(){
        this.setOpen(true)
        await this.collectionsStore.fetchItems(this.collectionId)
        this.setOpen(false)
    },
}
</script>