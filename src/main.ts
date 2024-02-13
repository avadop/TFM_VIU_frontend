import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mdb-vue-ui-kit/css/mdb.min.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
