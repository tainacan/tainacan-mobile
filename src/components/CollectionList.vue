<template>
    <ion-list>
        <ion-item v-for="collection of collections" :key="collection.id" :router-link="`/collections/${collection.id}`">
            <ion-thumbnail slot="start"> 
                <ion-img v-if="collection.thumbnail.thumbnail[0]" :src="collection.thumbnail.thumbnail[0]" :alt="collection.name"></ion-img>
                <ion-img v-else :src="image" :alt="collection.name"></ion-img>
            </ion-thumbnail>
            <ion-label> {{ collection.name }} </ion-label>
        </ion-item>
    </ion-list> 
</template>

<script lang="ts">

import {
    IonList,
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
        IonList,
        IonItem,
        IonImg,
        IonThumbnail,
        IonLabel,
    },
    setup() {
        const image = computed (() => require('../assets/placeholder_square_small.png'))
        return { image }
    },
}
</script>

