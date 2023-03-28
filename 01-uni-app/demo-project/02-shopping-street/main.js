import App from './App'
import * as Pinia from 'pinia'
import lazyPlugin from 'vue3-lazy'

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	
	app.use(Pinia.createPinia())
	app.use(lazyPlugin, {
		loading: '../static/images/common/placeholder.png'
	})
  return {
    app,
		Pinia
  }
}
// #endif