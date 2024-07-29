import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DashboardPage } from '../pages/dashboardPage/dashboardPage'
import { LoginPage } from '../pages/loginPage/loginPage'

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export function PublicRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
