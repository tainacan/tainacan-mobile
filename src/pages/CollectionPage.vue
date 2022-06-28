<template>
    <base-layout
            :page-title="(collectionObject && collectionObject.name) ? collectionObject.name : $t('collection')" 
            page-default-back-link="/collections">
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-toolbar>
             <ion-searchbar :placeholder="this.$t('label_search')" @ionChange="handleSearch($event)" @ionCancel="handleCancelSearch=($event)"></ion-searchbar>
        </ion-toolbar>
        <ion-loading
            :is-open="isLoading"
            :message="$t('label_loading')"
        >
        </ion-loading>
        <items-list :items="tainacanStore.collectionItems"></items-list>
            <ion-infinite-scroll ref="infiniteScroll" threshold="5%" @ionInfinite="loadItemsByCollection">
                <ion-infinite-scroll-content>
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
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
import { ref, defineComponent } from 'vue';
import { add, documentOutline, documentAttachOutline, documentsOutline } from "ionicons/icons";
import {
    IonLoading,
    IonRefresher,
    IonRefresherContent,
    IonIcon,
    IonButton,
    actionSheetController,
    IonInfiniteScroll,
    IonToolbar,
    IonSearchbar
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import ItemsList from '@/components/lists/ItemsList.vue';
export default defineComponent({
    components: {
        BaseLayout,
        ItemsList,
        IonLoading,
        IonRefresher,
        IonRefresherContent,
        IonIcon,
        IonButton,
        IonInfiniteScroll,
        IonToolbar,
        IonSearchbar
    },
    props: {
        id: String,
        collection: String
    },
    setup(props) {
        const isLoading = ref(false);
        const search = ref();
        const infiniteScroll = ref();
        const setIsLoading = (state: boolean) => isLoading.value = state;
        const setSearch = (value: string) => search.value = value;
        const loadItemsByCollection = async (event: any, reset: boolean) => {
            let hasMoreCollections = await tainacanStore.fetchItemsByCollection(props.id + '', { perPage: '12', orderBy: 'modified', reset: reset, search: search.value});
            if (event && event.target)
                event.target.complete();
            if (!hasMoreCollections){
                infiniteScroll.value.$el.disabled = true;
            }
        }
        const handleSearch = async (event: any) => {
            let search = event && event.detail && event.detail.value;
            if(search) {
                setSearch(search);
                await loadItemsByCollection(null, true);
            } else {
                setSearch('');
            }
        }
        const handleCancelSearch = async (event: any) => {
            if (event.cancelable) {
                event.preventDefault();
            }
            loadItemsByCollection(null, true);
        }
        const doRefresh = async (event: any) => {
            await loadItemsByCollection({}, true);
            if (event && event.target){
                event.target.complete();
                infiniteScroll.value.$el.disabled = false;
            }
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
        const collectionObject = props.collection ? JSON.parse(props.collection + '') : false;
        
        let tainacanStore = useTainacanStore();
        return {
            isLoading,
            tainacanStore,
            setIsLoading,
            loadItemsByCollection,
            doRefresh,
            openActionSheet,
            add,
            actionSheetLabels,
            setActionSheetLabels,
            collectionObject,
            infiniteScroll,
            handleSearch,
            handleCancelSearch
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
        await this.loadItemsByCollection({}, true);
        this.setIsLoading(false);
    },
});
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