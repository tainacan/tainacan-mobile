<template>
    <ion-page>
        <ion-header collapse="fade">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                </ion-buttons>
                <ion-img :src="tainacanLogo" class="header__tainacan-logo" />
                <ion-buttons slot="end">
                    <ion-button @click="logOff" aria-label="Sair">
                        <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <ion-toolbar>
                <ion-title size="small"> {{ pageTitle }} </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen="true">
            <slot />
        </ion-content>
    </ion-page>
</template>

<script>
import { logOutOutline } from "ionicons/icons";
import { 
    useWpStore
} from '../../store/storeWp';

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
        let wpStore = useWpStore();

        return {
            tainacanLogo,
            wpStore,
            logOutOutline
        }  
    },
    methods: {
        async logOff(){
            await this.wpStore.userLogOff();
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