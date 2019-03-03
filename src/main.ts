import Vue from 'vue'
import App from './components/app'
import './style.scss'

new Vue({
  el: '#app',
  render (h) {
    return h(App)
  }
})