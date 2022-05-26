<template>
    <ion-row>
        <ion-col size="6" v-for="item of items" :key="item.id">
            <ion-card button color="light" >
                <ion-img :src="(item.thumbnail && item.thumbnail.medium && item.thumbnail.medium[0]) ? item.thumbnail.medium[0] : thumbnailPlaceholder" :alt="item.title ? item.title : 'Imagem de item sem título'"></ion-img>
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