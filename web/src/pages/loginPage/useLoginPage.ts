import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context/globalContext/globalContext'
import { postAuthenticate } from '../../controller/loginPage/loginPageController'

export interface LoginProps {
  email: string
  password: string
}
export const useLoginPage = () => {
  const [loginProps, setLoginProps] = useState<LoginProps>({} as LoginProps)
  const { setUserProfile } = useContext(GlobalContext)
  const navigate = useNavigate()
  async function handleAuthenticate() {
    try {
      const { data } = await postAuthenticate(loginProps)
      setUserProfile(data.user)
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('id', data.user.id)
      navigate('/dashboard')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err)
        toast.error(err?.response?.data.message);
      } else {
        toast.error('Um erro inesperado aconteceu!');
      }
    }
  }
  return {
    handleAuthenticate,
    setLoginProps,
  }
}
