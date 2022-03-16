<template>
    <base-layout page-title="Items List" page-default-back-link="/collections">
    <ion-loading
    :is-open="isOpenRef"
    cssClass="my-custom-class"
    message="Carregando..."
    >
    </ion-loading>
    <ion-item v-for="item of items" :key="item.id">
        <ion-label v-if="item.title"> {{ item.title }} </ion-label>
        <ion-label v-else>Item não possui título</ion-label>
    </ion-item>
    </base-layout>
</template>

<script lang="ts">
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
        return { isOpenRef, setOpen }
    },
    data() {
        return {
            items: [],
            collectionId: this.$route.params.id,
        };
    },

    created(){
        this.setOpen(true)
<<<<<<< HEAD
        fetch(`https://rcteste.tainacan.org/wp-json/tainacan/v2/collection/${this.collectionId}/items`)
=======
        fetch(`https://museucasadahera.acervos.museus.gov.br/wp-json/tainacan/v2/collection/${this.collectionId}/items`)
>>>>>>> 7d57280a1235f0b4c6864010e4feac7f103b38fd
            .then((response) => response.json())
            .then((data) => {
                this.items = data.items;
                this.setOpen(false)
            });
    },
}
</script>