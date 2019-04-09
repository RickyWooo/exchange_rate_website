import Vue from 'vue'
import App from './App.vue'
import VCharts from 'v-charts'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
