<template>
    <base-layout page-title="Collections List">
        <ion-list>
            <ion-item v-for="collection of collections" :key="collection.id" :router-link="`/collections/${collection.id}`">
                <ion-thumbnail slot="start"> <!-- verificar se existe a imagem de fato -->
                    <ion-img :src="collection.thumbnail.thumbnail[0]" :alt="collection.name"></ion-img>
                </ion-thumbnail>
                <ion-label> {{ collection.name }} </ion-label>
            </ion-item>
        </ion-list> 
    </base-layout>
</template>

<script>
import {
    IonList,
    IonItem,
    IonImg,
    IonThumbnail,
    IonLabel,
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
export default {
    components: {
        IonList,
        IonItem,
        IonImg,
        IonThumbnail,
        IonLabel,
        BaseLayout
    },
    data() {
        return {
            collections: [],
        };
    },

    created(){
    fetch("https://museucasadahera.acervos.museus.gov.br/wp-json/tainacan/v2/collections?perpage=4&orderby=modified")
        .then((response) => response.json())
        .then((data) => {
        this.collections = data;
        });
    },

}
</script>

