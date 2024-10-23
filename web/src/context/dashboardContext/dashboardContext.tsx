import { createContext, useEffect, useState } from 'react'
import { getPosts } from '../../controller/dashboardPage/dashboardPageController'

export interface CommentsProps {
  comment: {
    id: number
    comment: string
    createdAt: string
    userId: number
    postId: number
  }
  user: {
    createdat: string
    email: string
    id: number
    image: string
    name: string
    office: string
    password: string
  }
}
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
  comments: CommentsProps[]
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
    } catch (err) {
      console.error(err)
    }
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
