import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


export const NavBar = () => {
    const history = useHistory()
   const auth = useContext(AuthContext)
    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

     return (
        <nav>
        <div className="nav-wrapper #e040fb purple accent-2" style={{padding: '0 2rem'}}>
          <span  className="brand-logo">Скорочення посилань</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Створити</NavLink></li>
            <li><NavLink to="/links">Посилання</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Вийти</a></li>
          </ul>
        </div>
      </nav>
     )
}