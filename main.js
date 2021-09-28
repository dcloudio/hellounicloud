import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createApp } from 'vue'
const app = createApp(App,{})
app.mount('#app')
// #endif