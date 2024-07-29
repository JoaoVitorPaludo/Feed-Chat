import { useContext, useState } from 'react'
import { GlobalContext } from '../../context/globalContext/globalContext'
import { postAuthenticate } from '../../controller/loginPage/loginPageController'

export interface LoginProps {
  email: string
  password: string
}
export const useLoginPage = () => {
  const [loginProps, setLoginProps] = useState<LoginProps>({} as LoginProps)
  const { setUserProfile } = useContext(GlobalContext)
  async function handleAuthenticate() {
    try {
      const { data } = await postAuthenticate(loginProps)
      setUserProfile(data.user)
    } catch (err) {}
  }
  return {
    handleAuthenticate,
    setLoginProps,
  }
}
