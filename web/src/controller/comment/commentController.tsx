import { api } from '../../service/api'


export const deleteComment = async (id: number) => {
    const response = await api.delete('/comments/delete', {
        headers: {
            token: sessionStorage.getItem('token'),
            id: id,
        }
    })

    return response
}