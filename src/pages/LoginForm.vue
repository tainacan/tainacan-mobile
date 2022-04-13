<template>  
    <form @submit.prevent="login">
        <ion-list>
            <ion-item>
                <ion-img width="10" height="10" alt="Logo Tainacan" :src="image" />
            </ion-item>
            <ion-item>
                <ion-input 
                placeholder="URL do Museu" 
                autofocus="true" 
                id="siteUrl"
                type="url"
                name="siteUrl"
                v-model.trim="siteUrl"
                required = "true"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input 
                placeholder="Login"
                id="userLogin"
                type="text"
                name="userLogin"
                v-model="userLogin"
                required = "true">
                </ion-input>            
            </ion-item>
            <ion-item>
                <ion-input 
                placeholder="Senha"  
                id="userPassword"
                type="password"
                name="userPassword"
                v-model="userPassword"
                required = "true">
                </ion-input>
            </ion-item>
        </ion-list>
            <ion-button type="submit">ACESSAR</ion-button>
        </form>
</template>

<script lang="ts">
import {
    useCollectionsStore
} from '../store/storeCollections';
import {
    IonImg,
    IonList,
    IonItem,
    IonInput,
} from '@ionic/vue';
import { computed } from 'vue';
export default {
    props: ['pageTitle', 'pageDefaultBackLink'],
    components: {
        IonImg,
        IonList,
        IonItem,
        IonInput,
    },
    data(){
        return {
            siteUrl: '',
            userLogin: '',
            userPassword: '',
        }
    },

    setup(){
        const image = computed (() => require('../assets/logoLogin.png'));
        let collectionsStore = useCollectionsStore();
        return { image, collectionsStore }
    },
    methods: {
        login(){
            this.collectionsStore.siteUrl = this.siteUrl;
            this.collectionsStore.userLogin = this.userLogin;
            this.collectionsStore.userPassword = this.userPassword;
            this.$router.push('/collections');
        }
    }

}
</script>

