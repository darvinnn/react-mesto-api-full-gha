import logo from '../images/header__logo.svg'
import { Link } from 'react-router-dom'

function Header({ headerField, onQuit, headerEmail }) {

  function setHeader() {
    if (headerField === 'Register') {
      return (
        <Link to='/sign-in' className='header__login'>Войти</Link>
      )
    }
    else if (headerField === 'Login') {
      return (
        <Link to='/sign-up' className='header__login'>Регистрация</Link>
      )
    }
    else if (headerField === '404') {
      return (<></>)
    }
    else return (
      <div className='header__main-fields'>
        <p className='header__email'>{headerEmail}</p>
        <Link to='/sign-in' className='header__exit' onClick={onQuit}>Выйти</Link>
      </div>
    )
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {setHeader()}
    </header>
  )
}

export default Header