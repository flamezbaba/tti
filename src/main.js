import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase/app";
import "firebase/auth";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VueCountdown from '@chenfengyuan/vue-countdown';

// Vue.config.productionTip = true
// Vue.prototype.$api_website = (Vue.config.productionTip) ? 'https://5ast.com/power' : 'http://127.0.0.1:8080/pos-api'
// Vue.prototype.$api_host = (Vue.config.productionTip) ? 'https://5ast.com/power/api/v1' : 'http://127.0.0.1:8080/pos-api/api/v1'
// Vue.prototype.$api_key = "IsIwnQR3Fm7qGyGN8D8wDjj4I9ZA5eCr1GnIpZCKqIKetfMofwyUOASv1KM8"

let app;
firebase.auth().onAuthStateChanged(() => {
    if(!app){
        app = createApp(App);
        app.config.productionTip = true;
        
        app.config.globalProperties.site_url = 'https://fdg.com';
        app.config.globalProperties.api_host = 'the host';

        app
        .use(store)
        .use(router)
        .use(VueSweetalert2)
        .component(VueCountdown.name, VueCountdown)
        .use(VueLoading)
        .mount('#app');


        // console.log(firebase.auth().currentUser.email);
    }
});

// createApp(App)
//         .use(store)
//         .use(router)
//         .mount('#app');




