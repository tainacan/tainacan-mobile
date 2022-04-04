<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-img width="80" height="80" :src="image" />
            </ion-toolbar>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                </ion-buttons>
                <ion-title> {{ pageTitle }} </ion-title>
            </ion-toolbar>
            <ion-toolbar>
                <ion-title> Login: {{collectionsStore.userLogin }} Senha: {{collectionsStore.userPassword }} </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot />
        </ion-content>
    </ion-page>
</template>

<script>
import {
    useCollectionsStore
} from '../../store/storeCollections';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonImg,
} from '@ionic/vue';
import { computed } from 'vue';
export default {
    props: ['pageTitle', 'pageDefaultBackLink'],
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonBackButton,
        IonButtons,
        IonImg,
    },
    setup(){
        const image = computed (() => require('../../assets/logo.png'))
        let collectionsStore = useCollectionsStore();
        return {
                image, collectionsStore,
            }
        
    }
}
</script>