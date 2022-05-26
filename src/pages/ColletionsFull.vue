<template>
    <ion-loading
    :is-open="isOpenRef"
    cssClass="my-custom-class"
    message="Carregando..."
    >
    </ion-loading>
    <base-layout>
        <ion-toolbar>
            <ion-label>Coleções</ion-label>
        </ion-toolbar>
        <base-collection-list :collections="collectionStore.collections"></base-collection-list>
    </base-layout>
</template>

<script>
import BaseCollectionList from '@/components/CollectionList.vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { IonLoading, IonToolbar, IonLabel } from '@ionic/vue';

import {
    useCollectionsStore
} from '../store/storeCollection';

import { ref } from 'vue';

export default {
    components: {
        BaseCollectionList,
        BaseLayout,
        IonLoading,
        IonToolbar,
        IonLabel
    },
    setup() {
        const isOpenRef = ref(false);
        const setOpen = (state) => isOpenRef.value = state;
        let collectionStore = useCollectionsStore();
        return { collectionStore, isOpenRef, setOpen }
    },
    async created(){
        this.setOpen(true);
        await this.collectionStore.fetchCollections();
        this.setOpen(false);
    },
}

</script>
