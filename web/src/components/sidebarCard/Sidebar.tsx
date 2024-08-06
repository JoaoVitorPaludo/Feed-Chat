import { Dialog } from '@mui/material'
import { PencilLine, SignOut } from 'phosphor-react'
import { Avatar } from '../avatar/Avatar'
import { UserModal } from './Modal/UserModal'
import styles from './Sidebar.module.css'
import { useSidebarCard } from './useSidebar'
export function Sidebar() {
  const { handleExit, userProfile, setOpenUserModal, openUserModal } =
    useSidebarCard()
  return (
    <aside className={styles.sidebar}>
      <img
        alt="profile-image"
        className={styles.cover}
        src="https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=40"
      />
      <Dialog
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        PaperProps={{
          style: {
            background: 'transparent',
          },
        }}
      >
        <UserModal handleCloseModal={() => setOpenUserModal(false)} />
      </Dialog>
      <div className={styles.profile}>
        <Avatar
          src={`
          data:image/png;base64,${userProfile.image}
          `}
          hasImage={userProfile.image !== ''}
        />

        <strong>{userProfile.name}</strong>
        <span>{userProfile.office || ''}</span>
      </div>
      <footer>
        <button onClick={() => setOpenUserModal(true)}>
          <PencilLine size={20} />
          Editar seu perfil
        </button>
        <button onClick={() => handleExit()}>
          <SignOut size={20} />
          Sair
        </button>
      </footer>
    </aside>
  )
}
