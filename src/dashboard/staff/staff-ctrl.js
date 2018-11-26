import Vue from 'vue';
import Vuetify from 'vuetify';
import StaffCtrl from './staff-ctrl.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
	render: h => h(StaffCtrl)
}).$mount('#app');
