import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { router } from './router/router'
import "./interceptors/axios";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const pinia = createPinia()
const app = createApp(App)

app.use(VueSweetalert2);

app.use(router)
app.use(pinia)
app.mount('#app')
