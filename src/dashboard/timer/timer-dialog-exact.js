import Vue from 'vue';
import Vuetify from 'vuetify';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import TimerDialog from './timer-dialog-exact.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

Vue.component(VueNumberInput.name, VueNumberInput);

new Vue({
	render: h => h(TimerDialog)
}).$mount('#app');
