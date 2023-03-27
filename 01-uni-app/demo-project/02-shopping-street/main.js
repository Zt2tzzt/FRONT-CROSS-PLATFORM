import App from './App'
import * as Pinia from 'pinia'

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	
	app.use(Pinia.createPinia())
  return {
    app,
		Pinia
  }
}
// #endif