import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingBasket, faTrash, faSearch, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

library.add(faShoppingBasket)
library.add(faTrash)
library.add(faSearch)
library.add(faPlus)
library.add(faMinus)

createApp(App)
  .use(router)
  .use(VueToast, { position: 'top' })
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
