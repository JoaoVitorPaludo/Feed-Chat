import { createContext, ReactNode, useState } from 'react'

export interface UserProfileProps {
  id: string
  name: string
  email: string
  office: string
  password: string
  image: string
  createdAt: string
}
interface GlobalContextProps {
  userProfile: UserProfileProps
  setUserProfile: React.Dispatch<UserProfileProps>
}

export const GlobalContext = createContext({} as GlobalContextProps)

interface GlobalProviderProps {
  children: ReactNode
}
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfileProps>(
    {} as UserProfileProps,
  )

  return (
    <GlobalContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </GlobalContext.Provider>
  )
}
