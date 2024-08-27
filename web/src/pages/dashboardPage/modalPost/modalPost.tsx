import { X } from 'phosphor-react'
import styles from './ModalPost.module.css'
import { useModalPost } from './useModalPost'
interface ModalPostProps {
  handleCloseModal: () => void
}
export function ModalPost({ handleCloseModal }: ModalPostProps) {
  const { handleSubmitNewPost, setPostMessage } = useModalPost({
    handleCloseModal,
  })
  return (
    <div className={styles.modalContainer}>
      <header>
        <X
          size={25}
          color="white"
          weight="bold"
          onClick={() => handleCloseModal()}
        />
      </header>
      <main className={styles.modalMainContent}>
        <p>Mensagem</p>
        <textarea
          placeholder="Digite sua mensagem!"
          onBlur={(e) => setPostMessage(e.target.value)}
        />
      </main>
      <footer>
        <button
          onClick={() => handleCloseModal()}
          className={styles.buttonsModal}
        >
          Cancelar
        </button>
        <button
          onClick={() => handleSubmitNewPost()}
          className={styles.buttonsModal}
        >
          Enviar
        </button>
      </footer>
    </div>
  )
}
