import { X } from 'phosphor-react'
import styles from './UserModal.module.css'
import { useUserModal } from './useUserModal'

interface UserModalProps {
  handleCloseModal: () => void
}
export function UserModal({ handleCloseModal }: UserModalProps) {
  const { handleUpdateUser, userProfile, setUserProfile, handleUploadImage } =
    useUserModal({
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
      <main className={styles.mainModal}>
        <div className={styles.inputContainer}>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Informe o seu nome"
            defaultValue={userProfile.name}
            onBlur={(e) =>
              setUserProfile({ ...userProfile, name: e.target.value })
            }
          />
        </div>

        <aside className={styles.asideModal}>
          <div className={styles.smallInputContainer}>
            <span>E-mail</span>
            <input
              type="text"
              placeholder="Informe o seu nome"
              defaultValue={userProfile.email}
              onBlur={(e) =>
                setUserProfile({ ...userProfile, email: e.target.value })
              }
            />
            <span>Cargo</span>
            <input
              type="text"
              placeholder="Informe o seu cargo"
              defaultValue={userProfile.office}
              onBlur={(e) =>
                setUserProfile({ ...userProfile, office: e.target.value })
              }
            />
          </div>
          <div className={styles.smallInputContainer}>
            <span>Imagem</span>
            <label htmlFor="fileInput" className={styles.imageLabel}>
              {userProfile.image === '' ? (
                <input
                  id="fileInput"
                  accept="image/png, image/jpeg"
                  name="file"
                  multiple={false}
                  type="file"
                  placeholder="Informe a sua senha"
                  className={styles.imageInput}
                  onChange={(e) => handleUploadImage(e.target.files)}
                />
              ) : (
                <>
                  <input
                    id="fileInput"
                    accept="image/png, image/jpeg"
                    name="file"
                    multiple={false}
                    type="file"
                    placeholder="Informe a sua senha"
                    className={styles.imageInput}
                    onChange={(e) => handleUploadImage(e.target.files)}
                  />
                  <img
                    id="fileInput"
                    src={`data:image/png;base64,${userProfile.image}`}
                    alt="Imagem do usuário"
                    className={styles.profileImage}
                  />
                </>
              )}
            </label>
          </div>
        </aside>
      </main>
      <footer className={styles.footerModal}>
        <button className={styles.btnModal} onClick={() => handleCloseModal()}>
          Cancelar
        </button>
        <button className={styles.btnModal} onClick={() => handleUpdateUser()}>
          Alterar
        </button>
      </footer>
    </div>
  )
}
