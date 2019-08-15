import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

// custom theme & variables
import './main.styl'

// import colors from 'vuetify/es5/util/colors'

// Translation provided by Vuetify
import en from 'vuetify/es5/locale/en'
import es from 'vuetify/es5/locale/es'

Vue.use(Vuetify, {
  lang: {
    locales: { en, es },
    current: 'es'
  },
  theme: {},
  customProperties: true,
  iconfont: 'md'
})
