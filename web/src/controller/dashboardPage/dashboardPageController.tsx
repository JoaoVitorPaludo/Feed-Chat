import { api } from '../../service/api'

export const getUserById = async () => {
  const response = await api.get('/users/findById', {
    headers: {
      token: sessionStorage.getItem('token'),
      id: sessionStorage.getItem('id'),
    },
  })
  return response
}
