<template>
    <base-layout :page-title="$t('label_items_list')" page-default-back-link="/collections">
        <ion-loading
                :is-open="isLoading"
                :message="$t('label_loading')"
        >
        </ion-loading>
        <items-list :items="tainacanStore.items"></items-list>
    </base-layout>
</template>

<script lang="ts">
import {
    useTainacanStore
} from '../store/storeTainacan';
import {
    IonLoading
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { ref } from 'vue';

import ItemsList from '../components/lists/ItemsList.vue';

export default {
    components: {
        IonLoading,
        ItemsList,
        BaseLayout
    },
    setup() {
        const isLoading = ref(false);
        const setOpen = (state: boolean) => isLoading.value = state;
        let tainacanStore = useTainacanStore();
        return { isLoading, setOpen, tainacanStore }
    },
    data() {
        return {
            items: [],
            collectionId: this.$route.params.id,
        };
    },

    async created(){
        this.setOpen(true)
        await this.tainacanStore.fetchItems()
        this.setOpen(false)
    },
}
</script>