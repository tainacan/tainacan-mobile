<template>
    <base-layout page-title="Collections List">
    <ion-loading
    :is-open="isOpenRef"
    cssClass="my-custom-class"
    message="Carregando..."
    >
    </ion-loading>
        <ion-list>
            <ion-item v-for="collection of collections" :key="collection.id" :router-link="`/collections/${collection.id}`">
                <ion-thumbnail slot="start"> 
                    <ion-img v-if="collection.thumbnail.thumbnail[0]" :src="collection.thumbnail.thumbnail[0]" :alt="collection.name"></ion-img>
                    <ion-img v-else src="https://cdn.icon-icons.com/icons2/1506/PNG/512/emblemok_103757.png" :alt="collection.name"></ion-img>
                </ion-thumbnail>
                <ion-label> {{ collection.name }} </ion-label>
            </ion-item>
        </ion-list> 
    </base-layout>
</template>

<script lang="ts">
import {
    IonList,
    IonItem,
    IonImg,
    IonThumbnail,
    IonLoading,
    IonLabel,
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import { ref } from 'vue';
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
        const isOpenRef = ref(false);
        const setOpen = (state: boolean) => isOpenRef.value = state;
        return { isOpenRef, setOpen }
    },
    data() {
        return {
            collections: [],
        };
    },

    created(){
        this.setOpen(true)
        fetch("https://rcteste.tainacan.org/wp-json/tainacan/v2/collections?perpage=4&orderby=modified")
        .then((response) => response.json())
        .then((data) => {
            this.collections = data;
            this.setOpen(false)
        });
    },

}
</script>

