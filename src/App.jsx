import { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import { BackgroundProvider } from './context/BackgroundContext'
import DynamicStyles from './components/DynamicStyles'
import { open } from '@tauri-apps/plugin-shell'

export default function App() {
  useEffect(() => {
    const handleClick = (event) => {
      const link = event.target.closest('a')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href) return

      // 只处理 http/https 外部链接
      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        return
      }

      // 如果链接有 download 属性，不拦截
      if (link.hasAttribute('download')) {
        return
      }

      // 阻止默认行为，在系统浏览器中打开
      event.preventDefault()
      open(href)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <Router>
      <BackgroundProvider>
        <DynamicStyles />
        <main>
          <AppRoutes />
        </main>
      </BackgroundProvider>
    </Router>
  )
}