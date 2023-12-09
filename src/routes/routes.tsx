import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/home'
import Checkout from '../pages/checkout'
import Login from '../pages/login/login'
import { RequireAuth } from '../context/auth/RequireAuth'
import About from '../pages/about'
import Terms from '../pages/terms'

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
