import { defineStore } from "pinia";
import axios from "axios";
import { Storage } from "@ionic/storage";
import {
  InAppBrowser,
  InAppBrowserObject,
  InAppBrowserEvent
} from "@awesome-cordova-plugins/in-app-browser/index";

const store = new Storage();

const useWpStore = defineStore("wp", {
  state() {
    return {
      userIsLoggedIn: false,
      userSiteUrl: "",
      userLogin: "",
      userToken: "",
      authorizationURL: "",
      inAppBrowser: InAppBrowserObject,
    };
  },

  actions: {
    async login(userSiteUrl: string, userLogin: string, userToken: string) {
      try {
        this.userIsLoggedIn = true;
        this.userSiteUrl = userSiteUrl;
        this.userLogin = userLogin;
        this.userToken = userToken;
        await store.set("userIsLoggedIn", true);
        await store.set("userSiteUrl", userSiteUrl);
        await store.set("userLogin", userLogin);
        await store.set("userToken", userToken);
      } catch (err) {
        this.userIsLoggedIn = false;
        this.userSiteUrl = "";
        this.userToken = "";
        this.userLogin = "";
        console.error("Erro no login:", err);
        return err;
      }
    },
    async logoff() {
      try {
        this.userIsLoggedIn = false;
        this.userSiteUrl = "";
        this.userToken = "";
        this.userToken = "";
        await store.set("userIsLoggedIn", false);
        await store.set("userSiteUrl", "");
        await store.set("userToken", "");
      } catch (err) {
        this.userIsLoggedIn = false;
        this.userSiteUrl = "";
        this.userToken = "";
        this.userToken = "";
        console.error("Erro no logoff:", err);
        return err;
      }
    },
    async fetchApplicationAuthorization(siteUrl: string) {
      try {
        const endpoint = siteUrl + "?rest_route=/";
        const response = await axios.get(endpoint);

        if (
          response.data &&
          response.data.authentication &&
          response.data.authentication["application-passwords"] &&
          response.data.authentication["application-passwords"].endpoints &&
          response.data.authentication["application-passwords"].endpoints
            .authorization
        )
          this.authorizationURL =
            response.data.authentication[
              "application-passwords"
            ].endpoints.authorization;
        else return false;
      } catch (err) {
        console.error("Error trying to fetch application authorization");
        return err;
      }
    },
    async checkUserLogin() {
      await store.create();
      this.userIsLoggedIn = await store.get("userIsLoggedIn");
      this.userSiteUrl = await store.get("userSiteUrl");
      this.userLogin = await store.get("userLogin");
      this.userToken = await store.get("userToken");
    },
    createInAppBrowser() {
      let tainacanAdminUrl = this.userSiteUrl + "/wp-admin/admin.php?page=tainacan_admin&mobileAppMode=true";
      if (!this.userIsLoggedIn && this.authorizationURL) 
        tainacanAdminUrl = this.authorizationURL + "?app_name=TainacanMobileApp&success_url=" + tainacanAdminUrl;
        
      const anInAppBrowser = InAppBrowser.create(tainacanAdminUrl);
      this.inAppBrowser = anInAppBrowser;
    },
    openAppBrowser(url: string) {
      const inAppBrowserScript = `
            window.addEventListener('hashchange', function() {
              console.log(window.location.hash);
            });
            window.history.replaceState(
              null,
              null,
              '${this.userSiteUrl}/wp-admin/admin.php?mobileAppMode=true&page=tainacan_admin#${url}'
            );
            window.history.go(0);
            `;
      if (!this.inAppBrowser || !this.inAppBrowser.executeScript)
        this.createInAppBrowser();

      this.inAppBrowser.executeScript({ code: inAppBrowserScript });
      this.inAppBrowser.show();
    },
  },
});
export { useWpStore };
