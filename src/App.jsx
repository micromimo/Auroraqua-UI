import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import { BackgroundProvider } from './context/BackgroundContext'
import DynamicStyles from './components/DynamicStyles'

export default function App() {
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