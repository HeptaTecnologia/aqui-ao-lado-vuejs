import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/routes';
import vuetify from './plugins/vuetify';
import {VueReCaptcha} from 'vue-recaptcha-v3'
import VueGtag from "vue-gtag";
import VueTheMask from 'vue-the-mask'

Vue.use(VueReCaptcha, {
    siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
    loaderOptions: {
        autoHideBadge: true
    }
});

Vue.use(VueGtag, {
    config: { id: process.env.VUE_APP_GTAG_ID }
}, router);

Vue.use(VueTheMask)
Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
