<template>  
    <form>
        <ion-list>
            <ion-item>
                <ion-img width="10" height="10" alt="Logo Tainacan" :src="image" />
            </ion-item>
            <ion-item>
                <ion-label position="stacked" color="primary">Link do museu</ion-label>
                <ion-input
                v-model="linkMuseu"
                name="linkMuseu"
                type="text"
                spellcheck="false"
                autocapitalize="off"
                required
                ></ion-input>
            </ion-item>

            <ion-item>
                <ion-label position="stacked" color="primary">Login</ion-label>
                <ion-input
                v-model="username"
                name="username"
                type="text"
                spellcheck="false"
                autocapitalize="off"
                required
                ></ion-input>
            </ion-item>

                <ion-item>
                    <ion-label position="stacked" color="primary">Senha</ion-label>
                    <ion-input v-model="password" name="password" type="password" required></ion-input>
                </ion-item>
            </ion-list>

            
            <ion-button type="submit">ACESSAR</ion-button>
    
        </form>

 

</template>

<script lang="ts">
import {
    IonImg,
} from '@ionic/vue';
import { computed } from 'vue';
export default {
    props: ['pageTitle', 'pageDefaultBackLink'],
    components: {
        IonImg,
    },
    setup(){
        const image = computed (() => require('../assets/logoLogin.png'))
            return { image }
    }
}
</script>