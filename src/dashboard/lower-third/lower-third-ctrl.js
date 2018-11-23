import Vue from 'vue';
import Vuetify from 'vuetify';
import LowerThirdCtrl from './lower-third-ctrl.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
	render: h => h(LowerThirdCtrl)
}).$mount('#app');
