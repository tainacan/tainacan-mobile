<template>
    <ion-app>
        <ion-router-outlet />
    </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { Device, DevicePlugin } from "@capacitor/device";

export default defineComponent({
    name: "App",
    components: {
        IonApp,
        IonRouterOutlet,
    },
    mounted() {
        const device: DevicePlugin = Device;
        device.getLanguageCode().then((res) => {
            if (res.value.includes("-")) {
                const language = res.value.split("-")[0];
                this.$i18n.locale = language;
            } else {
                this.$i18n.locale = res.value;
            }
        });
    },
});
</script>