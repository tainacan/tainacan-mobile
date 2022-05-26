<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-img slot="start" :src="tainacanLogo" class="header__tainacan-logo" />
                <ion-buttons slot="end">
                    <ion-button @click="logOff" aria-label="Sair">
                        <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                </ion-buttons>
                <ion-title> {{ pageTitle }} </ion-title>
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
} from '../../store/storeCollection';
import { logOutOutline } from "ionicons/icons";
import { 
    useUserStore
} from '../../store/storeUser';

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonBackButton,
    IonButton,
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
        IonIcon,
        IonButton,
        IonBackButton,
        IonButtons,
        IonImg,
    },
    setup(){
        const tainacanLogo = computed (() => require('../../assets/logo.png'))
        let collectionStore = useCollectionsStore();
        let userStore = useUserStore();
        return {
                tainacanLogo, collectionStore, userStore, logOutOutline
            }  
    },
    methods: {
        async logOff(){
            await this.userStore.userLogOff();
            this.$router.go();
        }

    }
}
</script>

<style>
.header__tainacan-logo {
    max-width: 65%;
}
</style>