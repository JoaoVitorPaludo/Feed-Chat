import { createContext, useEffect, useState } from 'react'
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

interface DashboardContextProps {
  postsList: PostsListProps[]
  handleGetPosts: () => void
}

export const DashboardContext = createContext({} as DashboardContextProps)

interface DashboardProviderProps {
  children: React.ReactNode
}
export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [postsList, setPostsList] = useState<PostsListProps[]>([])

  async function handleGetPosts() {
    try {
      const { data } = await getPosts()
      setPostsList(data)
    } catch (err) {}
  }

  useEffect(() => {
    handleGetPosts()
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        handleGetPosts,
        postsList,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
