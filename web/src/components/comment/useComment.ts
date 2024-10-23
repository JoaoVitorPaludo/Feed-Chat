import { formatDistanceToNow, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { toast } from "react-toastify"
import { CommentsProps } from "../../context/dashboardContext/dashboardContext"
import { deleteComment } from "../../controller/comment/commentController"


interface UseCommentProps {
    content: CommentsProps

}
export const useComment = ({ content }: UseCommentProps) => {
    const [likeCount, setLikeCount] = useState(0)


    const publishedDateFormatted = parseISO(content.comment.createdAt)
    const publishedDateRelativeToNow = formatDistanceToNow(
        parseISO(content.comment.createdAt),
        {
            locale: ptBR,
            addSuffix: true,
        },
    )

    async function handleDeleteComment(id: number) {
        try {
            const { data } = await deleteComment(id)
            console.log(data)
            toast.success(data.message)
        } catch (error) {
            toast.error("Ocorreu um erro ao excluir comentário.")
        }
    }

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        })
    }
    return { handleDeleteComment, handleLikeComment, likeCount, publishedDateFormatted, publishedDateRelativeToNow }
}