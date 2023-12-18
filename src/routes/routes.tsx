import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/home'
import Checkout from '../pages/checkout'
import Login from '../pages/login/login'
import { RequireAuth } from '../context/auth/RequireAuth'
import About from '../pages/about'
import Terms from '../pages/terms'
import Forgotten from '../pages/login/forgotten'
import Active from '../pages/login/active'
import Reset from '../pages/login/reset'

export const Routes = () =>
  useRoutes([
    {
      path: '*',
      element: <Home />
    },
    {
      path: '/inicio',
      element: <Home />
    },
    {
      path: '/login/:path',
      element: <Login />
    },
    {
      path: '/login/forgotten/',
      element: <Forgotten />
    },
    {
      path: '/login/active/:token',
      element: <Active />
    },
    {
      path: '/login/reset/:token',
      element: <Reset />
    },
    {
      path: '/sobre',
      element: <About />
    },
    {
      path: '/termos',
      element: <Terms />
    },
    {
      path: '/checkout',
      element: (
        <RequireAuth>
          <Checkout />
        </RequireAuth>
      )
    }
  ])
