import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { formatDistanceToNow, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { PostsListProps } from '../../context/dashboardContext/dashboardContext'
import { Avatar } from '../avatar/Avatar'
import { Comment } from '../comment/comment'
import styles from './post.module.css'

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

export interface PostType {
  id: number
  author: Author
  publishedAt: Date
  content: Content[]
}

interface PostProps {
  post: PostsListProps
}

export function Post({ post }: PostProps) {
  // const [comments, setComments] = useState(['Post muito bacana, hein?!'])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = parseISO(post.createdat)

  const publishedDateRelativeToNow = formatDistanceToNow(
    parseISO(post.createdat),
    {
      locale: ptBR,
      addSuffix: true,
    },
  )

  function handleCrateNewComment(event: FormEvent) {
    console.log(event)
    // event.preventDefault()

    // setComments([...comments, newCommentText])
    // setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  // function deleteComment(commentToDelete: string) {
  //   console.log(commentToDelete)
  //   // const commentsWithoutDeletedOne = comments.filter((comment) => {
  //   //   return comment !== commentToDelete
  //   // })

  //   // setComments(commentsWithoutDeletedOne)
  // }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={`data:image/png;base64,${post.user.image}`}
            hasImage={post.user.image ? true : false}
          />

          <div className={styles.authorInfo}>
            <strong>{post.user.name}</strong>
            <span>{post.user.office}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted.toISOString()}
          dateTime={post.createdat}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>{post.message}</div>

      <form onSubmit={handleCrateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {post.comments.map((comment) => (
          <Comment
            key={post.id}
            content={comment}
          // onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  )
}
