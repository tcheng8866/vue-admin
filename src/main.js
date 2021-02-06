import Promise from 'es6-promise'
Promise.polyfill()

import Vue from 'vue'
import 'normalize.css/normalize.css' // Normalize.css是一种CSS reset的替代方案
import Cookies from 'js-cookie' // token存储在cookies
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters

import '@/global.less' // 全局覆盖样式

import moment from 'moment'
import { validateNull } from '@/utils/validate'
import { getDefaultDate, isDateDiffOver, getAWeekAgoDate, getAMonthAgoDate, getLableBykey } from '@/utils/dataUtils'
// 全局方法
Vue.prototype.$moment = moment
Vue.prototype.$validateNull = validateNull
Vue.prototype.$getDefaultDate = getDefaultDate
Vue.prototype.$isDateDiffOver = isDateDiffOver
Vue.prototype.$getAWeekAgoDate = getAWeekAgoDate
Vue.prototype.$getAMonthAgoDate = getAMonthAgoDate
Vue.prototype.$getLableBykey = getLableBykey

// 可视化
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

// 百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'oLnP4KqCCZG8kVyMtP3af9f93M1mFmWc'
})

import VCharts from 'v-charts'
Vue.use(VCharts)

// // 开发环境模拟数据
// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
