import '@mdi/font/css/materialdesignicons.css'
import '@fontsource-variable/mona-sans'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

const app = createApp(App)
app.use(vuetify)
app.mount('#app')
