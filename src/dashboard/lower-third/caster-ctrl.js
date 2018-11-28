import Vue from 'vue';
import Vuetify from 'vuetify';
import CasterCtrl from './caster-ctrl.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
	render: h => h(CasterCtrl)
}).$mount('#app');
