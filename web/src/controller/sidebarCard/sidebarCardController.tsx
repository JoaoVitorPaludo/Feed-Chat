import { UserProfileProps } from '../../context/globalContext/globalContext'
import { api } from '../../service/api'

export const putUserCard = async (data: UserProfileProps) => {
  const response = await api.put(
    '/users/update',
    {
      id: sessionStorage.getItem('id'),
      name: data.name,
      office: data.office,
      image: data.image,
    },
    {
      headers: {
        token: sessionStorage.getItem('token'),
      },
    },
  )
  return response
}
