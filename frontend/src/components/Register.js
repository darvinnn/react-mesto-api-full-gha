import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function Register({ onSubmit, setHeaderField }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onSubmit({ email, password })
  }
  const handleEmail = (evt) => setEmail(evt.target.value)
  const handlePassword = (evt) => setPassword(evt.target.value)

  useEffect(() => {
    setHeaderField('Register')
  })

  return (
    <>
      <section className="login">
        <h3 className="login__title">Регистрация</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <input required className="login__input" type="email" placeholder="Email" value={email} onChange={handleEmail}></input>
          <input required className="login__input" type="password" placeholder="Пароль" value={password} onChange={handlePassword}></input>
          <input className="login__submit-button" type="submit" value="Зарегистрироваться" ></input>
          <h4 className="login__text">Уже зарегистрированы? <Link className="login__text_link" to="/sign-in">Войти</Link> </h4>
        </form>
      </section>
    </>
  )
}

export default Register