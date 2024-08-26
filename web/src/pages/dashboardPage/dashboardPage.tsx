import { Dialog, Tooltip } from '@mui/material'
import { Plus } from 'phosphor-react'
import { Header } from '../../components/header/Header'
import { Sidebar } from '../../components/sidebarCard/Sidebar'
import { ModalPost } from './components/modalPost/ModalPost'
import { Post } from './components/postCard/Post'
import styles from './DashboardPage.module.css'
import { useDashboardPage } from './useDashboardPage'

export function DashboardPage() {
  const { postsList, setShowModal, showModal } = useDashboardPage()
  // const posts: PostType[] = [
  //   {
  //     id: 1,
  //     author: {
  //       avatarUrl: 'https://github.com/diego3g.png',
  //       name: 'Diego Fernandes',
  //       role: 'CTO @Rocketseat',
  //     },
  //     content: [
  //       { type: 'paragraph', content: 'Fala galera 👋' },
  //       {
  //         type: 'paragraph',
  //         content:
  //           'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
  //       },
  //       { type: 'link', content: 'jane.design/doctorcare' },
  //     ],
  //     publishedAt: new Date('2022-05-03 20:00:00'),
  //   },
  //   {
  //     id: 2,
  //     author: {
  //       avatarUrl: 'https://github.com/maykbrito.png',
  //       name: 'Mayk Brito',
  //       role: 'Educator @Rocketseat',
  //     },
  //     content: [
  //       { type: 'paragraph', content: 'Fala galera 👋' },
  //       {
  //         type: 'paragraph',
  //         content:
  //           'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
  //       },
  //       { type: 'link', content: 'jane.design/doctorcare' },
  //     ],
  //     publishedAt: new Date('2022-05-10 20:00:00'),
  //   },
  // ]
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
