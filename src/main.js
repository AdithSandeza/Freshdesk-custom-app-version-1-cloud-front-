import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'flag-icon-css/css/flag-icon.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret , faChevronDown , faCog , faPhone , faPhoneSlash , faTh , faCaretDown,faMicrophoneAltSlash,faPause,faRandom} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
Vue.use(BootstrapVue)
library.add(faUserSecret,faChevronDown,faCog,faPhone,faPhoneSlash,faTh,faCaretDown,faMicrophoneAltSlash,faPause,faRandom)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
