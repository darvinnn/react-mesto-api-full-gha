import { useEffect, useState } from "react"

function Login({ setHeaderField, onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (evt) => setEmail(evt.target.value)
  const handlePassword = (evt) => setPassword(evt.target.value)
  const handleSubmit = (evt) => {
    evt.preventDefault()
    onSubmit({ email, password })
  }

  useEffect(() => {
    setHeaderField('Login')
  }, [])

  return (
    <section className="login">
      <h3 className="login__title">Вход</h3>
      <form className="login__form" onSubmit={handleSubmit}>
        <input required className="login__input" type="email" placeholder="Email" value={email} onChange={handleEmail}></input>
        <input required className="login__input" type="password" placeholder="Пароль" value={password} onChange={handlePassword}></input>
        <input className="login__submit-button" type="submit" value="Войти"></input>
      </form>
    </section>
  )
}

export default Login