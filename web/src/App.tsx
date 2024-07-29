import { GlobalProvider } from './context/globalContext/globalContext'
import './global.css'
import { LoginPage } from './pages/loginPage/loginPage'

export function App() {
  return (
    <GlobalProvider>
      <LoginPage />
    </GlobalProvider>
  )
}
