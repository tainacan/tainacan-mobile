<template>
    <base-layout :page-title="$t('collection')" page-default-back-link="/collections">
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-loading
            :is-open="isLoading"
            :message="$t('label_loading')"
        >
        </ion-loading>
        <items-list :items="tainacanStore.collectionItems"></items-list>
        <ion-button 
                class="add-items-button"
                color="primary"
                @click="openActionSheet()">
            <ion-icon :icon="add"></ion-icon>
            &nbsp;{{ $t('label_add_items') }}
        </ion-button>
    </base-layout>
</template>

<script lang="ts">
import {
    useTainacanStore
} from '../store/storeTainacan';
import { useRoute } from "vue-router";
import { ref } from 'vue';
import { add, documentOutline, documentAttachOutline, documentsOutline } from "ionicons/icons";

import {
    IonLoading,
    IonRefresher,
    IonRefresherContent,
    IonIcon,
    IonButton,
    actionSheetController
} from '@ionic/vue';

import BaseLayout from '@/components/base/BaseLayout.vue';
import ItemsList from '@/components/lists/ItemsList.vue';

export default {
    components: {
        BaseLayout,
        ItemsList,
        IonLoading,
        IonRefresher,
        IonRefresherContent,
        IonIcon,
        IonButton
    },
    setup() {
        const isLoading = ref(false);
        const setIsLoading = (state: boolean) => isLoading.value = state;
        const route = useRoute();
        const collectionId = route.params.id + '';
        const loadItemsByCollection = async () => {
            await tainacanStore.fetchItemsByCollection(collectionId, { perPage: '24', orderBy: 'modified'});
        }
        const doRefresh = async (event: any) => {
            await loadItemsByCollection();
            if (event && event.target)
                event.target.complete();
        }
        const actionSheetLabels = ref({
            header: '',
            button1: '',
            button2: '',
            button3: '',
            cancel: ''
        });
        const setActionSheetLabels = (newLabels: any) => actionSheetLabels.value = newLabels;
        const openActionSheet = async () => {
            const actionSheet = await actionSheetController.create({
                header: actionSheetLabels.value.header,
                cssClass: 'item-creation-action-sheet',
                buttons: [
                    {
                        text: actionSheetLabels.value.button1,
                        icon: documentsOutline,
                        data: 'multiple-items',  
                        handler: () => {
                            console.log('Vários iteeeens')
                        },
                    },
                    {
                        text: actionSheetLabels.value.button2,
                        icon: documentAttachOutline,
                        data: 'multiple-attachments',
                        handler: () => {
                            console.log('Item com vários anexos')
                        },
                    },
                    {
                        text: actionSheetLabels.value.button3,
                        icon: documentOutline,
                        data: 'single item',
                        handler: () => {
                            console.log('Item simples')
                        },
                    },
                    {
                        text: actionSheetLabels.value.cancel,
                        role: 'cancel'
                    },
                ],
            });
            await actionSheet.present();

            const { role, data } = await actionSheet.onDidDismiss();
            console.log('onDidDismiss resolved with role and data', role, data);
        }

        let tainacanStore = useTainacanStore();

        return {
            isLoading,
            tainacanStore,
            setIsLoading,
            loadItemsByCollection,
            doRefresh,
            openActionSheet,
            collectionId,
            add,
            actionSheetLabels,
            setActionSheetLabels
        }
    },
    async created() {
       
        this.setActionSheetLabels({
            header: this.$t('info_create_items'),
            button1: this.$t('label_option_multiple_items'),
            button2: this.$t('label_option_multiple_attachments'),
            button3: this.$t('label_option_single_item'),
            cancel: this.$t('label_cancel')
        });

        this.setIsLoading(true);
        await this.loadItemsByCollection();
        this.setIsLoading(false);
    },
}
</script>

<style>
.add-items-button {
    position: fixed;
    bottom: 16px;
    right: 16px;
    height: 52px;
    --padding-start: 24px;
    --padding-bottom: 16px;
    --padding-top: 16px;
    --padding-end: 24px;
    --border-radius: 18px;
}
</style>