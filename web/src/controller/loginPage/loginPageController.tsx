import { LoginProps } from '../../pages/loginPage/useLoginPage'
import { api } from '../../service/api'

export const postAuthenticate = async (data: LoginProps) => {
  const response = await api.post('/login', {
    email: data.email,
    password: data.password,
  })
  return response
}
