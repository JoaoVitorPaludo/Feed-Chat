import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DashboardProvider } from '../context/dashboardContext/dashboardContext'
import { GlobalProvider } from '../context/globalContext/globalContext'
import { DashboardPage } from '../pages/dashboardPage/DashboardPage'
import { LoginPage } from '../pages/loginPage/loginPage'

export function PrivateRoutes() {
  const token = sessionStorage.getItem('token')
  if (token === null) {
    return <LoginPage />
  }
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <DashboardProvider>
            <DashboardPage />
          </DashboardProvider>
        }
      />
    </Routes>
  )
}

export function PublicRoutes() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}
