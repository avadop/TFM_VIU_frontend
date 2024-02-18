import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mdb-vue-ui-kit/css/mdb.min.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
