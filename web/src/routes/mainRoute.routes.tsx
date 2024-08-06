import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalProvider } from '../context/globalContext/globalContext'
import { DashboardPage } from '../pages/dashboardPage/dashboardPage'
import { LoginPage } from '../pages/loginPage/loginPage'

export function PrivateRoutes() {
  const token = sessionStorage.getItem('token')
  if (token === null) {
    return <LoginPage />
  }
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export function PublicRoutes() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}
