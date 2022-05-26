<template>
    <ion-row class="items-list-container">
        <ion-col size="6" v-for="item of items" :key="item.id">
            <ion-card button color="light" >
                <ion-img :src="(item.thumbnail && item.thumbnail['tainacan-medium'] && item.thumbnail['tainacan-medium'][0]) ? item.thumbnail['tainacan-medium'][0] : thumbnailPlaceholder" :alt="item.title ? item.title : 'Imagem de item sem título'"></ion-img>
                <ion-card-header>
                    <ion-card-title v-if="item.title"> {{ item.title ? item.title : 'Item sem título' }} </ion-card-title>
                </ion-card-header>
            </ion-card>
        </ion-col>
    </ion-row>
</template>

<script lang="ts">
import {
    IonCardHeader,
    IonRow,
    IonCol,
    IonCard,
    IonImg,
    IonCardTitle
} from '@ionic/vue';

import { computed } from 'vue';
export default {
    props: [
        "items"
    ],
    components: {
        IonCardHeader,
        IonRow,
        IonCol,
        IonCard,
        IonImg,
        IonCardTitle
    },
    setup() {
        const thumbnailPlaceholder = computed (() => require('../../assets/placeholder_square_small.png'));
        return { thumbnailPlaceholder }
    }
}
</script>

<style>
.items-list-container {
    --ion-grid-column-padding: 0px;
    padding: 12px;
}
.items-list-container ion-card {
    box-shadow: none;
    margin: 4px;
}
.items-list-container ion-card-header {
    padding: 12px;
}
.items-list-container ion-card-title {
    font-size: 0.875rem;
    font-weight: normal;
}
</style>