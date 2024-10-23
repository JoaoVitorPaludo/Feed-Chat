import styles from './loginPage.module.css'
import { useLoginPage } from './useLoginPage'

export function LoginPage() {
  const { handleAuthenticate, setLoginProps } = useLoginPage()
  return (
    <div className={styles.loginPageContainer}>
      <main className={styles.loginPageCard}>
        <h1>Acesse sua conta </h1>
        <div className={styles.loginPageInputCard}>
          <p>E-mail</p>
          <input
            type="text"
            placeholder="Seu E-mail"
            onBlur={(e) =>
              setLoginProps((prevState) => {
                return { ...prevState, email: e.target.value }
              })
            }
          />
        </div>
        <div className={styles.loginPageInputCard}>
          <p>Senha</p>

          <input
            type="password"
            placeholder="Sua Senha"
            onBlur={(e) =>
              setLoginProps((prevState) => {
                return { ...prevState, password: e.target.value }
              })
            }
          />

        </div>

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
