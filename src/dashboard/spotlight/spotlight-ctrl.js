import Vue from 'vue';
import Vuetify from 'vuetify';
import Spotlight from './spotlight-ctrl.vue';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vue({
	render: h => h(Spotlight)
}).$mount('#app');
