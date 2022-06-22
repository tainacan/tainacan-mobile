<template>
    <ion-modal ref="modal" trigger="open-explanation-modal" :initial-breakpoint="0.9" :breakpoints="[0, 0.5, 0.75, 1.0]">
        <ion-content 
                style="font-size: 0.9375rem; opacity: 0.85"
                class="ion-padding">
            <h1>Application Passwords</h1>
            <p><em>Application passwords</em> are a safe way to peform operations without using your actual website password. To generate one, you must: 
                <ol>
                    <li>Open a web browser and login do your website traditional login page (usually <em>"https://your-website.com.br/wp-admin"</em>).</li>
                    <li>Go to your profile page by clicking on your picture in the upper right corner.</li>
                    <li>Scroll down to the "Application passwords" section. There should be a text input labelled "New name to the application password".</li>
                    <li>Fill in the text input with any value to identify this password (you can have multiple), for example: "Tainacan Mobile".</li>
                    <li>Click on the "Add new application password" button.</li>
                </ol>
            </p>
            <p>With this steps completed, you will receive a code, that may look like this:</p>
            <pre><code>vlOh CdaH UqWw YV7X beou 6MFY</code></pre>
            <p>Copy this code and <strong>keep it safe somewhere</strong>. You won't be able to access it later. Finally, paste it on this app login screen.</p>
            <p>While it should be kept logged in, if you ever loose your access to the app, you can revogate the previous passwords and generate new ones in the same screen.</p>
        </ion-content>
    </ion-modal>
</template>

<script lang="ts">

import {
    IonModal,
    IonContent
} from '@ionic/vue';
export default {
    components: {
        IonModal,
        IonContent
    },
    setup() {
        return {}
    }
}
</script>
