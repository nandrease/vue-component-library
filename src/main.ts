import Vue from 'vue';
import CompositionApi from '@vue/composition-api';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(CompositionApi);

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
