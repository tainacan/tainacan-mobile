<template>
    <ion-page>
        <ion-content class="login-form-content" fullscreen>
            <ion-row class="ion-align-items-center ion-justify-content-center">
                <ion-col>
                    <ion-img
                        class="login-form-content__tainacan-logo"
                        alt="Logo Tainacan"
                        :src="image"
                    />
                    <form @submit.prevent="openLoginForm">
                        <ion-list class="ion-no-margin" inset>
                            <ion-item>
                                <ion-label position="floating">
                                    {{ $t("label_site_url") }}
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
                                    enterkeyhint="next"
                                >
                                </ion-input>
                            </ion-item>
                        </ion-list>
                        <br />
                        <ion-button type="submit" fill="clear">
                            {{ $t("label_access_archive") }}
                            <ion-icon
                                slot="end"
                                :icon="arrowForwardOutline"
                            ></ion-icon>
                        </ion-button>
                        <ion-button @click="fakeLogin" color="danger" fill="clear">
                            Testes sem login
                            <ion-icon
                                slot="end"
                                :icon="arrowForwardOutline"
                            ></ion-icon>
                        </ion-button>
                    </form>
                </ion-col>
            </ion-row>
            <app-password-modal />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { useTainacanStore } from "../store/storeTainacan";
import { useWpStore } from "../store/storeWp";
import { arrowForwardOutline } from "ionicons/icons";
import AppPasswordModal from "../components/modals/AppPasswordModal.vue";

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
    IonContent,
} from "@ionic/vue";
import { computed } from "vue";
import { InAppBrowserEvent } from "@awesome-cordova-plugins/in-app-browser/index";

export default {
    props: ["pageTitle", "pageDefaultBackLink"],
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
        IonContent,
        AppPasswordModal,
    },
    data() {
        return {
            siteUrl: "",
        };
    },
    setup() {
        const image = computed(() => require("../assets/logo_square.png"));
        let tainacanStore = useTainacanStore();
        let wpStore = useWpStore();
        return { image, tainacanStore, wpStore, arrowForwardOutline };
    },
    methods: {
        async openLoginForm() {
            this.wpStore.userSiteUrl = this.siteUrl;
            await this.wpStore.fetchApplicationAuthorization(this.siteUrl);
            if (this.wpStore.authorizationURL) {
                this.wpStore.createInAppBrowser('?page=tainacan_mobile_app');
                this.wpStore.inAppBrowser
                    .on("loadstop")
                    .subscribe(this.handleBrowserLoadStop);
            }
        },
        async handleBrowserLoadStop(event: InAppBrowserEvent) {
            console.log(event)
            if (
                event.url &&
                typeof event.url == "string" &&
                event.url.split("?") &&
                event.url.split("?").length >= 2
            ) {
                const params = new URLSearchParams(event.url.split("?")[1]);
     
                if ( params.get("page") === "tainacan_mobile_app" ) {
                    const userLogin = params.get("user_login");
                    let userToken = params.get("password");

                    if (
                        typeof userToken == "string" &&
                        userToken.indexOf("#") >= 0
                    )
                        userToken = userToken.split("#")[0];

                    if (!!userLogin && !!userToken) {
                        await this.wpStore.login(
                            this.siteUrl,
                            userLogin,
                            userToken
                        );
                        this.$router.push("/home");
                    }
                    this.wpStore.inAppBrowser.hide();
                }
            }
        },
        fakeLogin() {
            this.wpStore.login(
                'https://rcteste.tainacan.org',
                '',
                ''
            );
            this.$router.push("/home");
        }
    },
};
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
