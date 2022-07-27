<template>
    <ion-row class="items-list-container">
        <ion-col size="4" v-for="item of items" :key="item.id">
            <ion-card @click="openActionSheet(item)" button color="light" >
                <ion-img :src="(item.thumbnail && item.thumbnail['tainacan-medium'] && item.thumbnail['tainacan-medium'][0]) ? item.thumbnail['tainacan-medium'][0] : thumbnailPlaceholder" :alt="(item.thumbnail_alt ? item.thumbnail_alt : (item.title ? item.title : 'Imagem de item sem título'))"></ion-img>
                <ion-card-header>
                    <ion-card-title>{{ item.title ? item.title : $t('label_item_without_title') }}</ion-card-title>
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
    IonCardTitle,
    actionSheetController,
    ActionSheetButton
} from '@ionic/vue';
import { pencil, trashBin } from "ionicons/icons";
import { computed, ref, defineComponent } from 'vue';
import { useWpStore } from '@/store/storeWp';
import { useTainacanStore } from '@/store/storeTainacan';
import { InAppBrowserEvent } from '@awesome-cordova-plugins/in-app-browser';

export default defineComponent({
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
        const wpStore = useWpStore();
        const tainacanStore = useTainacanStore();
        const thumbnailPlaceholder = computed (() => require('../../assets/placeholder_square_small.png'));
        
        const actionSheetLabels = ref({
            header: '',
            button1: '',
            button2: '',
            cancel: ''
        });
        const setActionSheetLabels = (newLabels: any) => actionSheetLabels.value = newLabels;
        const openActionSheet = async (event: any) => {
            const item = event;
            
            if (item.current_user_can_edit || item.current_user_can_delete) {

                let actionSheetButtons: ActionSheetButton[] = [];

                if (item.current_user_can_edit)
                    actionSheetButtons.push({
                        text: actionSheetLabels.value.button1,
                        icon: pencil,
                        data: 'edit-item',  
                        handler: () => {
                            openItemEdition(item);
                        },
                    });

                if (item.current_user_can_delete)
                    actionSheetButtons.push({
                        text: actionSheetLabels.value.button2,
                        icon: trashBin,
                        data: 'delete-item',  
                        handler: () => {
                            deleteItem(item);
                        }
                    });

                actionSheetButtons.push({
                    text: actionSheetLabels.value.cancel,
                    role: 'cancel'
                });

                let actionSheetOptions = {
                    header: actionSheetLabels.value.header,
                    cssClass: 'item-creation-action-sheet',
                    buttons: actionSheetButtons
                };

                const actionSheet = await actionSheetController.create(actionSheetOptions);
                await actionSheet.present();
            }
        }
        const deleteItem = function(item: any) {
            tainacanStore.deleteItem(item.id);
        }
        const openItemEdition = function(item: any) {
            wpStore.openInAppBrowser('?page=tainacan_admin&mobileAppMode=true#/collections/' + item.collection_id + '/items/' + item.id + '/edit');
            wpStore.listenEventInAppBrowser((event: InAppBrowserEvent) => {
                if (event &&
                    event.data &&
                    event.data.type === 'item_updated' &&
                    event.data.item &&
                    event.data.item.status !== 'auto-draft'
                ) {
                    wpStore.hideInAppBrowser();
                }
            });
        }
        
        return { thumbnailPlaceholder, wpStore, openItemEdition, setActionSheetLabels, openActionSheet }
    },
    async created() {
        this.setActionSheetLabels({
            header: this.$t('label_item_actions'),
            button1: this.$t('label_option_edit_item'),
            button2: this.$t('label_option_delete_item'),
            cancel: this.$t('label_cancel')
        });
    }
});
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