<template>
    <ion-item class="collection-list-item" v-for="collection of collections" :key="collection.id" :router-link="`/collections/${collection.id}`">
        <ion-thumbnail slot="start"> 
            <ion-img :src="(collection.thumbnail && collection.thumbnail.thumbnail && collection.thumbnail.thumbnail[0]) ? collection.thumbnail.thumbnail[0] : thumbnailPlaceholder" :alt="collection.name ? collection.name : $('label_collection_without_name')"></ion-img>
        </ion-thumbnail>
        <ion-label>
            <h2>
                {{ collection.name ? collection.name : $t('label_collection_without_name') }}&nbsp;
                <span v-if="collection.status === 'private'">
                    <ion-icon :icon="lockClosedOutline"></ion-icon>
                </span>
                <span v-else-if="collection.status === 'draft'">
                    <ion-icon :icon="readerOutline"></ion-icon>
                </span>
                <span v-else-if="collection.status === 'trash'">
                    <ion-icon :icon="trashOutline"></ion-icon>
                </span>
            </h2>
            <p v-if="collection.total_items">
                {{ $t('total_of_published_items', [collection.total_items.publish]) }}
            </p>
        </ion-label>
    </ion-item>
</template>

<script lang="ts">
import {
    IonItem,
    IonImg,
    IonThumbnail,
    IonLabel,
    IonIcon
} from '@ionic/vue';
import { lockClosedOutline, readerOutline, trashOutline } from 'ionicons/icons';
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
        IonIcon
    },
    setup() {
        const thumbnailPlaceholder = computed (() => require('../../assets/placeholder_square_small.png'))
        return { thumbnailPlaceholder, lockClosedOutline, readerOutline, trashOutline }
    },
}
</script>

<style>
.collection-list-item {
    --border-color: var(--ion-color-step-900, #e6e6e6);
}
.collection-list-item ion-img {
    --border-radius: 4px;
}
</style>