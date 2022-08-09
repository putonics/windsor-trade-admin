import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import MainFrame from './MainFrame'
import ROUTES from '../editables/ROUTES'
import { useLogin } from './Login'
import LoadingTransition from './LoadingTransition'

const Router = props => {
  const unauthPaths = ROUTES.filter(route => !route.auth).map(route => route.path)
  const authPaths = ROUTES.filter(route => route.auth).map(route => route.path)

  const location = useLocation()
  const navigate = useNavigate()
  const login = useLogin()

  let busy = false
  React.useEffect(() => {
    if (busy) return
    if (!login.info) {
      busy = true
      login.signin().finally(() => {
        busy = false
      })
    } else if (unauthPaths.includes(location.pathname)) {
      navigate('/dash')
    }
  }, [location])

  React.useEffect(() => {
    if (!login.signinTried) return
    if (!login.info && authPaths.includes(location.pathname)) {
      navigate('/')
      return
    }
    if (login.info && unauthPaths.includes(location.pathname)) {
      navigate('/dash')
      return
    }
  }, [login])

  return (
    <Routes>
      {
        ROUTES.map((route, index) => (
          <Route
            exact path={route.path}
            element={
              login.signinTried
                ?
                route.auth
                  ? <MainFrame>{route.element}</MainFrame>
                  : <>{route.element}</>
                :
                <LoadingTransition />
            }
            key={'route-' + index}
          />
        ))
      }
    </Routes>
  )
}

export default Router