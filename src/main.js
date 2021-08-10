import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
require("./plugins")
Vue.config.productionTip = false
import "./scss/_main.scss"
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
