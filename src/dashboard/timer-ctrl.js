import Vue from 'vue';
import Vuetify from 'vuetify';
import TimerCtrl from './timer-ctrl.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
	render: h => h(TimerCtrl)
}).$mount('#app');
