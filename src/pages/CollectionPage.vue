<template>
    <base-layout
            :page-title="$t('label_collection_items_list')" 
            page-default-back-link="/collections">
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-toolbar>
             <ion-searchbar debounce="500" :placeholder="$t('label_search')" @ionChange="handleSearch($event)"></ion-searchbar>
        </ion-toolbar>
        <ion-loading
            :is-open="isLoading"
            :message="$t('label_loading')"
        >
        </ion-loading>
        <ion-spinner v-if="isSearching"></ion-spinner>
        <div 
            v-if="!isLoading && !isSearching && (!tainacanStore.totalCollectionItems || tainacanStore.totalCollectionItems == '0')" 
            class="results-not-found"
        >
            <span> {{$t('label_no_results_found')}} </span>
        </div>
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
import { useWpStore } from '../store/storeWp';
import { ref, defineComponent } from 'vue';
import { add, documentOutline, documentsOutline } from "ionicons/icons";
import {
    IonLoading,
    IonRefresher,
    IonRefresherContent,
    IonIcon,
    IonButton,
    actionSheetController,
    IonInfiniteScroll,
    IonToolbar,
    IonSearchbar,
    IonSpinner,
    IonInfiniteScrollContent
} from '@ionic/vue';
import BaseLayout from '@/components/base/BaseLayout.vue';
import ItemsList from '@/components/lists/ItemsList.vue';
import { InAppBrowserEvent } from '@awesome-cordova-plugins/in-app-browser';

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
        IonSearchbar,
        IonSpinner,
        IonInfiniteScrollContent
    },
    props: {
        id: String
    },
    setup(props) {
        const isLoading = ref(false);
        const isSearching = ref(false)
        const search = ref();
        const infiniteScroll = ref();
        const setIsLoading = (state: boolean) => isLoading.value = state;
        const setIsSearching = (state: boolean) => isSearching.value = state;
        const setSearch = (value: string) => search.value = value;
        const loadItemsByCollection = async (event: any, reset: boolean) => {
            await tainacanStore.fetchItemsByCollection(props.id + '', { perPage: '12', orderBy: 'modified', reset: reset, search: search.value});
            let hasMoreCollectionsItems = tainacanStore.totalCollectionItems && tainacanStore.totalCollectionItems !== 0;
            if (event && event.target)
                event.target.complete();
            if (!hasMoreCollectionsItems){
                infiniteScroll.value.$el.disabled = true;
            }
        }    
        const cancelSearch = async () => {
            await loadItemsByCollection(null, true);
        }
        const handleSearch = async (event: any) => {
            let search = event && event.detail && event.detail.value;

            setSearch(search);
            setIsSearching(true);

            if(search !== '') {   
                await loadItemsByCollection(null, true);
            } else {
                await cancelSearch();
            }
            setIsSearching(false);
        }
        const doRefresh = async (event: any) => {
            await loadItemsByCollection({}, true);
            if (event && event.target){
                event.target.complete();
                infiniteScroll.value.$el.disabled = false;
            }
        }

        const wpStore = useWpStore();
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
                    // {
                    //     text: actionSheetLabels.value.button1,
                    //     icon: documentsOutline,
                    //     data: 'multiple-items',  
                    //     handler: () => {
                    //         wpStore.openInAppBrowser('?page=tainacan_admin&mobileAppMode=true#/collections/' + props.id + '/bulk-add');
                    //         wpStore.listenEventInAppBrowser((event: InAppBrowserEvent) => {
                    //             if (event &&
                    //                 event.data &&
                    //                 (
                    //                     (
                    //                         event.data.type === 'item_updated' &&
                    //                         event.data.item &&
                    //                         event.data.item.status !== 'auto-draft'
                    //                     )
                    //                     || event.data.type === 'exited_from_navigation'
                    //                 )
                    //             ) {
                    //                 wpStore.hideInAppBrowser();
                    //                 loadItemsByCollection({}, true);
                    //             }
                    //         });
                    //     },
                    // },
                    {
                        text: actionSheetLabels.value.button3,
                        icon: documentOutline,
                        data: 'single item',
                        handler: () => {
                            wpStore.openInAppBrowser('?page=tainacan_admin&mobileAppMode=true#/collections/' + props.id + '/items/new');
                            wpStore.listenEventInAppBrowser((event: InAppBrowserEvent) => {
                                if (event &&
                                    event.data &&
                                    event.data.type === 'item_updated' &&
                                    event.data.item &&
                                    event.data.item.status !== 'auto-draft'
                                ) {
                                    wpStore.hideInAppBrowser();
                                    loadItemsByCollection({}, true);
                                }
                            });
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
            isSearching,
            tainacanStore,
            wpStore,
            setIsLoading,
            loadItemsByCollection,
            doRefresh,
            openActionSheet,
            add,
            actionSheetLabels,
            setActionSheetLabels,
            infiniteScroll,
            handleSearch,
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
        text-transform: capitalize;
        position: fixed;
        bottom: 16px;
        right: 16px;
        height: 50px;
        --padding-start: 20px;
        --padding-bottom: 10px;
        --padding-top: 10px;
        --padding-end: 20px;
        --border-radius: 16px;
    }
    ion-spinner {
        margin-top: 2rem;
    }
</style>