import styles from './comment.module.css'

import { ThumbsUp, Trash } from 'phosphor-react'
import { CommentsProps } from '../../context/dashboardContext/dashboardContext'
import { Avatar } from '../avatar/Avatar'
import { useComment } from './useComment'

interface CommentProps {
  content: CommentsProps
  // onDeleteComment: (comment: string) => void
}
export function Comment({ content }: CommentProps) {
  const {
    handleDeleteComment, handleLikeComment, likeCount, publishedDateFormatted, publishedDateRelativeToNow
  } = useComment({ content })



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
              onClick={() => handleDeleteComment(content.comment.id)}
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
