<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-img width="80" height="80" :src="image" />
      </ion-toolbar>
      <ion-toolbar color="primary">
        <ion-title> Coleções </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card v-for="collection of computedObj" :key="collection.id">
        <ion-card-header>
          <ion-card-title>{{ collection.name }} </ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard,
  IonCardHeader,
  IonCardTitle, 
  IonImg,
} from '@ionic/vue';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle, 
    IonImg 
    },
  setup(){
    const image = computed (() => require('../assets/logo.png'))
    return {
      image,
    }
  },

data() {
  return {
    collections: [],
    limit: 4,
  };
},

created(){
  fetch("https://rcteste.tainacan.org/wp-json/tainacan/v2/collections")
    .then((response) => response.json())
    .then((data) => {
      this.collections = data;
    });
},

computed:{
  computedObj(){
    return this.limit ? this.collections.slice(0,this.limit) : this.collections
  }
},

});


  
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>