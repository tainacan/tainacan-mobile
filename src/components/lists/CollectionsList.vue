<template>
    <ion-item v-for="collection of collections" :key="collection.id" :router-link="`/collections/${collection.id}`">
        <ion-thumbnail slot="start"> 
            <ion-img :src="(collection.thumbnail && collection.thumbnail.thumbnail && collection.thumbnail.thumbnail[0]) ? collection.thumbnail.thumbnail[0] : thumbnailPlaceholder" :alt="collection.name ? collection.name : 'Imagem de coleção sem nome'"></ion-img>
        </ion-thumbnail>
        <ion-label> {{ collection.name ? collection.name : 'Coleção sem nome' }} </ion-label>
    </ion-item>
</template>

<script lang="ts">
import {
    IonItem,
    IonImg,
    IonThumbnail,
    IonLabel,
} from '@ionic/vue';
import { computed } from 'vue';

export default {
    props: [
        "collections"
    ],
    components: {
        IonItem,
        IonImg,
        IonThumbnail,
        IonLabel,
    },
    setup() {
        const thumbnailPlaceholder = computed (() => require('../../assets/placeholder_square_small.png'))
        return { thumbnailPlaceholder }
    },
}
</script>

