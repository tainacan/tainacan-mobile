<template>
    <ion-loading
    :is-open="isOpenRef"
    cssClass="my-custom-class"
    message="Carregando..."
    >
    </ion-loading>
    <ion-card v-for="item of collectionsStore.items" :key="item.id">
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
} from '../../store/storeCollections';
import {
    IonCard,
    IonLoading,
} from '@ionic/vue';

import { ref } from 'vue';
export default {
    components: {
        IonCard,
        IonLoading,
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
        await this.collectionsStore.fetchItems()
        this.setOpen(false)
    },
}
</script>