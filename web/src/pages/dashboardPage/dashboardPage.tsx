import { Dialog, Tooltip } from '@mui/material'
import { Plus } from 'phosphor-react'
import { Header } from '../../components/header/Header'
import { Post } from '../../components/postCard/post'
import { Sidebar } from '../../components/sidebarCard/Sidebar'
import styles from './dashboardPage.module.css'
import { ModalPost } from './modalPost/modalPost'
import { useDashboardPage } from './useDashboardPage'

export function DashboardPage() {
  const { postsList, setShowModal, showModal } = useDashboardPage()

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {postsList.map((post) => {
            return <Post key={post.id} post={post} />
          })}
        </main>
        <Dialog
          open={showModal}
          onClose={() => setShowModal(false)}
          PaperProps={{
            style: {
              background: 'transparent',
            },
          }}
        >
          <ModalPost handleCloseModal={() => setShowModal(false)} />
        </Dialog>
        <Tooltip title="Novo Post" placement="top">
          <button className={styles.newPost} onClick={() => setShowModal(true)}>
            <Plus size={20} weight="bold" />
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
