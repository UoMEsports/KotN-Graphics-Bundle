import Vue from 'vue';
import Vuetify from 'vuetify';
import CasterCtrl from './caster-ctrl.vue';
import vSelect from 'vue-select';

Vue.component('v-select2', vSelect);

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
	render: h => h(CasterCtrl)
}).$mount('#app');
