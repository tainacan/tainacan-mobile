<template>  
    <ion-page>
        <ion-content class="login-form-content" fullscreen>
            <ion-row class="ion-align-items-center ion-justify-content-center">
                <ion-col>
                    <ion-img class="login-form-content__tainacan-logo" alt="Logo Tainacan" :src="image" />
                    <form @submit.prevent="login">
                        <ion-list class="ion-no-margin" inset>
                            <ion-item>
                                <ion-label position="floating">
                                    URL do Site do Acervo
                                </ion-label>
                                <ion-input 
                                        placeholder="https://my-tainacan-museum.com" 
                                        autofocus="true" 
                                        id="siteUrl"
                                        type="url"
                                        name="siteUrl"
                                        v-model.trim="siteUrl"
                                        required="true"
                                        autocomplete="url"
                                        enterkeyhint="next">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">
                                    Nome do usuário
                                </ion-label>
                                <ion-input 
                                        placeholder="seu nome de usuário aqui"
                                        id="userLogin"
                                        type="text"
                                        name="userLogin"
                                        v-model="userLogin"
                                        required="true"
                                        autocomplete="username"
                                        enterkeyhint="next"
                                        inputmode="url">
                                </ion-input>            
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">
                                    Senha do usuário
                                </ion-label>
                                <ion-input 
                                        placeholder="sua senha de usuário aqui"  
                                        id="userPassword"
                                        type="password"
                                        name="userPassword"
                                        v-model="userPassword"
                                        required="true"
                                        autocomplete="new-password"
                                        enterkeyhint="done">
                                </ion-input>
                            </ion-item>
                        </ion-list>
                        <br>
                        <ion-button type="submit" fill="clear">
                            Acessar acervo
                            <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
                        </ion-button>
                    </form>
                </ion-col>
            </ion-row>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { useCollectionsStore } from '../store/storeCollection';
import { useUserStore } from '../store/storeUser';
import { arrowForwardOutline } from "ionicons/icons";

import {
    IonImg,
    IonPage,
    IonList,
    IonItem,
    IonButton,
    IonInput,
    IonLabel,
    IonRow,
    IonCol,
    IonContent
} from '@ionic/vue';
import { computed } from 'vue';
export default {
    props: ['pageTitle', 'pageDefaultBackLink'],
    components: {
        IonImg,
        IonPage,
        IonList,
        IonItem,
        IonButton,
        IonInput,
        IonLabel,
        IonRow,
        IonCol,
        IonContent
    },
    data(){
        return {
            siteUrl: '',
            userLogin: '',
            userPassword: '',
        }
    },
    setup(){
        const image = computed (() => require('../assets/logo_square.png'));
        let collectionStore = useCollectionsStore();
        let userStore = useUserStore();
        return { image, collectionStore, userStore, arrowForwardOutline }
    },
    methods: {
        async login(){
            await this.userStore.userLogin(this.siteUrl);
            // this.collectionStore.siteUrl = this.siteUrl;
            // this.collectionStore.userLogin = this.userLogin;
            // this.collectionStore.userPassword = this.userPassword;
            this.$router.push('/home');
        }
    }

}
</script>

<style>
.login-form-content {
    --ion-background-color: var(--ion-color-step-950, #f2f2f2);
}
.login-form-content form {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.login-form-content form ion-button {
    margin-left: auto;
}
.login-form-content ion-row {
    height: 100%;
}
.login-form-content__tainacan-logo {
    max-width: 250px;
    padding: 2rem;
    margin: 0.5rem auto;
}
</style>
