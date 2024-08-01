import styles from './loginPage.module.css'
import { useLoginPage } from './useLoginPage'

export function LoginPage() {
  const { handleAuthenticate, setLoginProps } = useLoginPage()
  return (
    <div className={styles.loginPageContainer}>
      <main className={styles.loginPageCard}>
        <h1>Login </h1>

        <input
          type="text"
          placeholder="Email"
          onBlur={(e) =>
            setLoginProps((prevState) => {
              return { ...prevState, email: e.target.value }
            })
          }
        />
        <input
          type="password"
          placeholder="Password"
          onBlur={(e) =>
            setLoginProps((prevState) => {
              return { ...prevState, password: e.target.value }
            })
          }
        />

        <button
          className={styles.loginButton}
          onClick={() => handleAuthenticate()}
        >
          Entrar
        </button>
      </main>
    </div>
  )
}
