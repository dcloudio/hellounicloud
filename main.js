import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false



uni.showModal = ()=>{};

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
