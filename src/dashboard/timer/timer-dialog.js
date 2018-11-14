import Vue from 'vue';
import Vuetify from 'vuetify';
import TimerDialog from './timer-dialog.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
	render: h => h(TimerDialog)
}).$mount('#app');
