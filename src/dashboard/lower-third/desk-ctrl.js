import Vue from 'vue';
import Vuetify from 'vuetify';
import DeskCtrl from './desk-ctrl.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
	render: h => h(DeskCtrl)
}).$mount('#app');
