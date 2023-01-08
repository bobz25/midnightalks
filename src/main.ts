import '@unocss/reset/tailwind.css'
import 'uno.css'
import { ViteSSG } from 'vite-ssg'
import type { RouteRecordRaw } from 'vue-router'
import lazyPlugin from 'vue3-lazy'
import App from './App.vue'
import './style.css'

const routes: RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    component: () => import('./pages/index.vue'),
  },
]

export const createApp = ViteSSG(
  App,
  { routes },
  ({
    app,
    router,
    routes,
    isClient,
    initialState,
  }) => {
    app.use(lazyPlugin, {
      loading: 'logo-large.jpg',
      error: 'not-found.jpg',
    })
  },
)
