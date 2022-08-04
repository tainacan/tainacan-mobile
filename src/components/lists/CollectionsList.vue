<template>
    <ion-item
            class="collection-list-item"
            v-for="collection of collections"
            :key="collection.id"
            @click="!isInSelectionMode ? goToCollectionPage(collection) : ''">
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
        <ion-radio 
                v-if="isInSelectionMode"
                slot="end" 
                :value="collection.id">
        </ion-radio>
    </ion-item>
</template>

<script lang="ts">
import {
    IonItem,
    IonImg,
    IonThumbnail,
    IonLabel,
    IonIcon,
    IonRadio
} from '@ionic/vue';
import { useRouter } from "vue-router";
import { lockClosedOutline, readerOutline, trashOutline } from 'ionicons/icons';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    props: [
        "collections",
        "isSelectionMode"
    ],
    components: {
        IonItem,
        IonImg,
        IonThumbnail,
        IonLabel,
        IonIcon,
        IonRadio
    },
    setup(props) {
        const isInSelectionMode = computed(() => props.isSelectionMode);
        const thumbnailPlaceholder = computed (() => require('../../assets/placeholder_square_small.png'))
        const router = useRouter();
        const goToCollectionPage = (collection: any) => {
            router.push({
                name: 'collection',
                params: {
                    id: collection.id
                },
            });
        }
        return {
            thumbnailPlaceholder,
            lockClosedOutline,
            readerOutline,
            trashOutline,
            goToCollectionPage,
            isInSelectionMode
        }
    },
})
</script>

<style>
.collection-list-item {
    --border-color: var(--ion-color-step-900, #e6e6e6);
}
.collection-list-item ion-img {
    --border-radius: 4px;
}
</style>