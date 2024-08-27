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

export const getPosts = async () => {
  const response = await api.get('/posts', {
    headers: {
      token: sessionStorage.getItem('token'),
    },
  })
  return response
}

export const postPost = async (message: string) => {
  const response = await api.post(
    '/posts/create',
    {
      message,
      userId: sessionStorage.getItem('id'),
    },
    {
      headers: {
        token: sessionStorage.getItem('token'),
      },
    },
  )
  return response
}
