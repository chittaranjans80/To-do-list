import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faEye,
  faPen,
  faTrash,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* add icons to the library */
library.add(faEye, faPen, faTrash, faChevronDown, faChevronUp)
const app = createApp(App)

app.use(router)

/* add font awesome icon component */
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
