import { useEffect, useState } from 'react'
import { getPosts } from '../../controller/dashboardPage/dashboardPageController'

export interface PostsListProps {
  id: number
  message: string
  createdat: string
  user: {
    id: number
    name: string
    office: string
    email: string
    password: string
    image: string
    createdat: string
  }
}
export const useDashboardPage = () => {
  const [postsList, setPostsList] = useState<PostsListProps[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  async function handleGetPosts() {
    try {
      const { data } = await getPosts()
      setPostsList(data)
    } catch (err) {}
  }

  useEffect(() => {
    handleGetPosts()
  }, [])

  return {
    postsList,
    setShowModal,
    showModal,
  }
}
