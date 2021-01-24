import React from 'react'
import { createRoutesFromChildren } from 'react-router-dom'
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from './api'

export const UserContext = React.createContext()
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [loading, setLoading] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function autoLogin() {
      async function autoLogin() {
        const token = window.localStorage.getItem('token')
        if (token) {
          try {
            setError(null)
            setLoading(true)
            const { url, options } = TOKEN_VALIDATE_POST(token)
            const response = await fetch(url, options)
            if (!response.ok) throw new Error('Token inválido')
            await getUser(token)
          } catch (err) {
            userLogout()
          } finally {
            setLoading(false)
          }
        }
      }
    }
    autoLogin()
  }, [userLogout])

  async function getUser(token) {
    const { url, options } = USER_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()
    setData(json)
    setLogin(true)
  }

  async function userLogin(username, password) {
    try {
      setError(null)
      setLoading(true)
      const { url, options } = TOKEN_POST({ username, password })
      const tokenRes = await fetch(url, options)
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`)
      const { token } = await tokenRes.json()
      window.localStorage.setItem('token', token)
      await getUser(token)
    } catch (err) {
      setError(err.message)
      setLogin(false)
    } finally {
      setLoading(false)
    }
  }

  async function userLogout() {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)
    window.localStorage.removeItem('token')
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  )
}
