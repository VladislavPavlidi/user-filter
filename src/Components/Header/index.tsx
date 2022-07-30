import React from 'react'
import { Link } from 'react-router-dom'
import ROUTES from '../../routes'

export default function Header() {
  return (
    <header>
        <nav>
            <Link to={ROUTES.home()}>На главную</Link>
            <Link to={ROUTES.users()}>Пользователи</Link>
            <Link to={ROUTES.profile()}>Профиль</Link>
        </nav>
    </header>
  )
}
