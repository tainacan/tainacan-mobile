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
                                    {{ $t('label_site_url') }}
                                </ion-label>
                                <ion-input 
                                        :placeholder="$t('placeholder_site_url')" 
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
                                    {{ $t('label_user_name') }}
                                </ion-label>
                                <ion-input 
                                        :placeholder="$t('placeholder_user_name')"
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
                                    {{ $t('label_user_password') }}
                                </ion-label>
                                <ion-input 
                                        :placeholder="$t('placeholder_user_password')" 
                                        id="userToken"
                                        type="password"
                                        name="userToken"
                                        v-model="userToken"
                                        required="true"
                                        autocomplete="new-password"
                                        enterkeyhint="done">
                                </ion-input>
                            </ion-item>
                        </ion-list>
                        <br>
                        <ion-button type="submit" fill="clear">
                            {{ $t('label_access_archive') }}
                            <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
                        </ion-button>
                    </form>
                </ion-col>
            </ion-row>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { useTainacanStore } from '../store/storeTainacan';
import { useWpStore } from '../store/storeWp';
import { arrowForwardOutline } from "ionicons/icons";

import {
    IonIcon,
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
        IonIcon,
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
            userToken: '',
        }
    },
    setup(){
        const image = computed (() => require('../assets/logo_square.png'));
        let tainacanStore = useTainacanStore();
        let wpStore = useWpStore();
        return { image, tainacanStore, wpStore, arrowForwardOutline }
    },
    methods: {
        async login(){
            await this.wpStore.login(this.siteUrl, this.userLogin, this.userToken);
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
