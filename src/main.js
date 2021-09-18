import Vue from 'vue'

import ElementUI from 'element-ui'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang i18n
console.log(process.env)
import { mockXHR } from './mock'
 if(process.env.NODE_ENV == 'development'){
    mockXHR();
 }

import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
//import '@/filter'
import waves from "@/directive/waves"
Vue.use(waves)


import hasPermission from '@/directive/permission'
hasPermission.install(Vue) // import and init directive `hasPermission` for global Vues

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { elementZhLocale })

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false // 设置为false以阻止vue在启动时生成生产提示

import moment from 'moment' // moment
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

import auth from '@/utils/auth' // auth
Object.defineProperty(Vue.prototype, '$auth', { value: auth })

import CommonUtil from '@/utils/commonUtil'
Object.defineProperty(Vue.prototype, '$phSpt', { value: CommonUtil.placeholderSupport() })

// Object.defineProperty(Vue.prototype, '$ifJfw2Jportal', { value: process.env.NODE_ENV === 'production' }) // true-不展示nav和header， false-正常展示
Object.defineProperty(Vue.prototype, '$ifJfw2Jportal', { value: true })

// 统一样式
Object.defineProperty(Vue.prototype, '$FormInputSize', { value: 'mini' })
Object.defineProperty(Vue.prototype, '$FormBtnSize', { value: 'medium' })

import dataService from '@/utils/request';
Vue.prototype.$dataService = dataService;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
