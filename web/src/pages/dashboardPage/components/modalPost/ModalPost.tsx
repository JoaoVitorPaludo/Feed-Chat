import { X } from 'phosphor-react'
import styles from './ModalPost.module.css'
interface ModalPostProps {
  handleCloseModal: () => void
}
export function ModalPost({ handleCloseModal }: ModalPostProps) {
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
        <textarea placeholder="Digite sua mensagem!" />
      </main>
      <footer>
        <button
          onClick={() => handleCloseModal()}
          className={styles.buttonsModal}
        >
          Cancelar
        </button>
        <button
          onClick={() => handleCloseModal()}
          className={styles.buttonsModal}
        >
          Enviar
        </button>
      </footer>
    </div>
  )
}
