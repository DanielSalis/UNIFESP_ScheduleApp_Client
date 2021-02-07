import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'
import api from '../../Components/Api'

import styles from './_style.module.scss'
import loadingAnimation from '../../Assets/Rolling-1s-200px.svg'

const Login = () => {
  // useCallback(() => history.push('/scheduler'), [history])
  const history = useHistory()
  
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const [loading, setLoading] = useState(true)
  
  const handleOnClick = async (e) => {
    setLoading(true)
    e.preventDefault();

    const payload = {
      name: '',
      email: email,
      password: password
    }

    await api.post('/api/auth/login', payload)
      .then(async res => {
        debugger
        localStorage.setItem('authToken', res.data.token);
        return res.data.token
      })
      .then(async () => {
        const object = await api.get('/api/auth/getAuth', {
          headers: {
              'x-auth-token': localStorage.getItem('authToken')
          }
        })
        localStorage.setItem('UserLogged', JSON.stringify(object.data))
        setLoading(false)
        history.push('/scheduler');
      })
      .catch(async e => {
        setLoading(false)
        console.log(e)
      })
  }

  const handleEmailChange= async(e)=>{
    await updateEmail(e.target.value)
  }

  const handlePasswordChange= async (e)=>{
    await updatePassword(e.target.value)
  }

  return (
    <div className={styles.loginContainer}>
      {loading && <div className={styles.loginLoading}><img src={loadingAnimation}></img></div>}
      <div className={styles.squareContainer}>
        <div className={styles.titleContainer}>
          <FiCalendar size={30} color="#0f499d" />
          <h2>Scheduler</h2>
        </div>
        <div className={styles.formContainer}>
          <div>
            <span>Email</span>
            <input type="email" onChange={handleEmailChange}></input>
          </div>
          <div>
            <span>Senha</span>
            <input type="password" onChange={handlePasswordChange}></input>
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
