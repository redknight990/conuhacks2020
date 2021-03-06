import Vue from 'vue';
import App from './app.vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import store from './store';
import router from './router';

Vue.config.productionTip = true;

library.add(fas)

Vue.component('icon', FontAwesomeIcon)

Vue.use(BootstrapVue);

Vue.use(VueSweetalert2);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
