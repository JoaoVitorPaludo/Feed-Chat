import { useContext } from 'react'
import { GlobalContext } from '../../../context/globalContext/globalContext'
import { putUserCard } from '../../../controller/sidebarCard/sidebarCardController'

interface UseUserModalProps {
  handleCloseModal: () => void
}
export const useUserModal = ({ handleCloseModal }: UseUserModalProps) => {
  const { userProfile, setUserProfile } = useContext(GlobalContext)

  async function handleUpdateUser() {
    try {
      const { data } = await putUserCard(userProfile)
      setUserProfile(data.user)
      handleCloseModal()
    } catch (e) {}
  }
  async function handleUploadImage(file: FileList | null) {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file[0])
      reader.onloadend = () => {
        if (reader.result) {
          const image = String(reader.result).split(',')[1]
          setUserProfile({ ...userProfile, image })
        }
      }
    }
  }
  return {
    userProfile,
    handleUpdateUser,
    setUserProfile,
    handleUploadImage,
  }
}
