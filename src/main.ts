import { createApp } from 'vue'
import App from './App.vue'
import { worker } from './mocks/browser'


if (process.env.NODE_ENV === 'development') {
  worker.start()
}

createApp(App).mount('#app')
