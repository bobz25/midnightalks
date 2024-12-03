import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 初始化 Service Worker
export const worker = setupWorker(...handlers)

// 在开发环境中启动 worker
if (process.env.NODE_ENV === 'development') {
  worker.start()
}
