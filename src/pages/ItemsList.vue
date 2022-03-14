<template>
    <base-layout page-title="Items List" page-default-back-link="/collections">
    <ion-item v-for="item of items" :key="item.id">
        <ion-label> {{ item.title }} </ion-label>
    </ion-item>
    </base-layout>
</template>

<script>
import {
    IonItem,
    IonLabel,
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
export default {
    components: {
        IonItem,
        IonLabel,
        BaseLayout
    },
    data() {
        return {
            items: [],
            collectionId: this.$route.params.id,
        };
    },

    created(){
        fetch(`https://museucasadahera.acervos.museus.gov.br/wp-json/tainacan/v2/collection/${this.collectionId}/items`)
            .then((response) => response.json())
            .then((data) => {
                this.items = data.items;
            });
    },
}
</script>