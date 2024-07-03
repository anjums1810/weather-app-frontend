import Vue from 'vue';
import App from './App.vue';
import apolloProvider from './apollo';

//Vue.config.productionTip = true;

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app');