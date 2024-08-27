import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/globalContext/globalContext'
import { getUserById } from '../../controller/dashboardPage/dashboardPageController'

export const useSidebarCard = () => {
  const { userProfile, setUserProfile } = useContext(GlobalContext)
  const [openUserModal, setOpenUserModal] = useState<boolean>(false)
  const navigate = useNavigate()

  function handleExit() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')

    navigate('/')
  }

  async function handleGetUser() {
    try {
      const { data } = await getUserById()
      setUserProfile(data)
    } catch (e) {}
  }

  useEffect(() => {
    if (userProfile.id === undefined) {
      handleGetUser()
    }
  }, [])

  return {
    userProfile,
    handleExit,
    setOpenUserModal,
    openUserModal,
  }
}
