<template>
  <ion-page>  
    <ion-content :fullscreen="true">
      <iframe width="100%" height="100%" src="https://rcteste.tainacan.org/wp-login.php" allowfullscreen/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
  }
});
</script>
