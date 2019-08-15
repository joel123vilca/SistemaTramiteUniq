import Vue from 'vue'
import './plugins/vuetify/vuetify'
import './plugins/element/element'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import './registerServiceWorker'
import '@/plugins/axios'
import { ability } from '@/config/ability'
import { abilitiesPlugin } from '@casl/vue'

Vue.use(abilitiesPlugin, ability)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App
})
/* eslint-enable no-new */
