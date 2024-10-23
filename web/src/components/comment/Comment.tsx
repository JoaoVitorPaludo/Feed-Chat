import { useState } from 'react'
import styles from './comment.module.css'

import { formatDistanceToNow, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ThumbsUp, Trash } from 'phosphor-react'
import { CommentsProps } from '../../context/dashboardContext/dashboardContext'
import { Avatar } from '../avatar/Avatar'

interface CommentProps {
  content: CommentsProps
  // onDeleteComment: (comment: string) => void
}
export function Comment({ content }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  // function handleDeleteComment() {
  //   onDeleteComment(content)
  // }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    })
  }
  const publishedDateFormatted = parseISO(content.comment.createdAt)
  const publishedDateRelativeToNow = formatDistanceToNow(
    parseISO(content.comment.createdAt),
    {
      locale: ptBR,
      addSuffix: true,
    },
  )

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/diego3g.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{content.user.name}</strong>
              <time
                title={publishedDateFormatted.toISOString()}
                dateTime={content.comment.createdAt}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            <button
              // onClick={handleDeleteComment}
              title="Deletar comentário"
            >
              <Trash size={24} />
            </button>
          </header>

          {/* <p>{content}</p> */}
          <p>{content.comment.comment}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
