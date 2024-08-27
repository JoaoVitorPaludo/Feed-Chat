import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { DashboardContext } from '../../../../context/dashboardContext/dashboardContext'
import { postPost } from '../../../../controller/dashboardPage/dashboardPageController'

interface UseModalPostProps {
  handleCloseModal: () => void
}
export const useModalPost = ({ handleCloseModal }: UseModalPostProps) => {
  const [postMessage, setPostMessage] = useState<string>('')
  const { handleGetPosts } = useContext(DashboardContext)

  async function handleSubmitNewPost() {
    try {
      const { data } = await postPost(postMessage)
      setPostMessage('')
      toast.success(data.message)
      handleGetPosts()
      handleCloseModal()
    } catch (err) {
      toast.error('Ocorreu um erro ao inserir um novo post!')
    }
  }

  return {
    handleSubmitNewPost,
    setPostMessage,
  }
}
