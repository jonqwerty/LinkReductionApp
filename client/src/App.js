import React from 'react'

import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'

import 'materialize-css'
import { AuthContext } from './context/AuthContext'
import { NavBar } from './components/NavBar'
import { Loader } from './components/Loader'


function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticted = !!token
  const routes = useRoutes(isAuthenticted)

  if (!ready) {
    return <Loader />
  }
  
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticted
    }}>
     
    <BrowserRouter>
    {isAuthenticted && <NavBar/> }
      <div className="container">
        {routes}
      </div>
   </BrowserRouter>
   </AuthContext.Provider>
  )
}

export default App;
