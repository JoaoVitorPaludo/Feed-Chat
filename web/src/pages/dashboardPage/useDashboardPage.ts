import { useContext, useState } from 'react'
import { DashboardContext } from '../../context/dashboardContext/dashboardContext'

export const useDashboardPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { postsList } = useContext(DashboardContext)

  return {
    postsList,
    setShowModal,
    showModal,
  }
}
