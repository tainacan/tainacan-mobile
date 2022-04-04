<template>  
    <form>
        <ion-list>
            <ion-item>
                <ion-img width="10" height="10" alt="Logo Tainacan" :src="image" />
            </ion-item>
            <ion-item>
                <ion-input 
                placeholder="URL do Museu" 
                autofocus="true" 
                id="urlMuseum"
                type="text"
                name="urlMuseum"
                v-model.trim="urlMuseum"
                required = "true"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input 
                placeholder="Login"
                id="userLogin"
                type="text"
                name="userLogin"
                v-model="userLogin">
                </ion-input>            
            </ion-item>
            <ion-item>
                <ion-input 
                placeholder="Senha"  
                id="userPassword"
                type="password"
                name="userPassword"
                v-model="userPassword">
                </ion-input>
            </ion-item>
        </ion-list>
            <ion-button @click="login">ACESSAR</ion-button>
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
            urlMuseum: '',
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
            this.collectionsStore.urlMuseum = this.urlMuseum;
            this.collectionsStore.userLogin = this.userLogin;
            this.collectionsStore.userPassword = this.userPassword;
            this.$router.push('/collections');
        }
    }

}
</script>

