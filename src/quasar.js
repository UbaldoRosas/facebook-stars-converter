import Vue from 'vue'

import './styles/quasar.scss'
import iconSet from 'quasar/icon-set/material-icons-outlined.js'
import lang from 'quasar/lang/en-us.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: {
  },
  lang: lang,
  iconSet: iconSet
 })