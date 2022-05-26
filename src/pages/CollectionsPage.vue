<template>
    <base-layout :page-title="$t('label_collections_list')" page-default-back-link="/">
        <ion-loading
                :is-open="isLoading"
                :message="$t('label_loading')"
        >
        </ion-loading>
        <ion-list>
            <collections-list :collections="tainacanStore.collections"></collections-list>
        </ion-list>
    </base-layout>
</template>

<script>
import CollectionsList from '@/components/lists/CollectionsList.vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { IonLoading, IonList } from '@ionic/vue';

import {
    useTainacanStore
} from '../store/storeTainacan';

import { ref } from 'vue';

export default {
    components: {
        CollectionsList,
        BaseLayout,
        IonLoading,
        IonList
    },
    setup() {
        const isLoading = ref(false);
        const setOpen = (state) => isLoading.value = state;
        let tainacanStore = useTainacanStore();
        return { tainacanStore, isLoading, setOpen }
    },
    async created(){
        this.setOpen(true);
        await this.tainacanStore.fetchCollections();
        this.setOpen(false);
    },
}

</script>
