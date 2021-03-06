import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem('loggedUserBloglist', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setUser(null)
      window.localStorage.removeItem('loggedUserBloglist')
    } catch (exception) {
      console.log(exception.message)
    }
    
  }

  const formOrUser = user
    ? <div>
        <p>{user.name} is logged in</p>
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>
      </div>
    : <div>
        <h2>login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>

  return formOrUser
}

export default Login