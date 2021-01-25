import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'

import styles from './_style.module.scss'

const Login = () => {
  const history = useHistory()
  const handleOnClick = useCallback(() => history.push('/scheduler'), [history])

  return (
    <div className={styles.loginContainer}>
      <div className={styles.squareContainer}>
        <div className={styles.titleContainer}>
          <FiCalendar size={30} color="#0f499d" />
          <h2>Scheduler</h2>
        </div>
        <div className={styles.formContainer}>
          <div>
            <span>Email</span>
            <input type="text"></input>
          </div>
          <div>
            <span>Senha</span>
            <input type="text"></input>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button>Esqueci minha senha</button>
          <button onClick={handleOnClick}>Entrar</button>
        </div>
      </div>
    </div>
  )
}

export default Login
