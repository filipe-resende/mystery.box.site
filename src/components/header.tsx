import React, { useState } from 'react'

import { Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useAuth } from '../context/auth/AuthProvider'
import CartModal from './modal/cart'

export default function Header() {
  const [open, setOpen] = useState(false)
  const carrinhoItens = useSelector((state: any) => state.carrinho.itens)
  const { user, signout } = useAuth()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <header className="header-section">
      <div className="header-warp">
        <div className="header-bar-warp">
          <NavLink to="/inicio" className="header-bar-figure">
            <Image src="/img/logo.png" alt="" />
          </NavLink>

          <nav className="top-nav-area w-100">
            <ul className="main-menu primary-menu">
              <li>
                <NavLink
                  to="/inicio"
                  className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                  }
                >
                  INÍCIO
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sobre"
                  className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                  }
                >
                  DÚVIDAS FREQUENTES
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/termos"
                  className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                  }
                >
                  TERMOS DE USO
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink
                    to="/termos"
                    className={({ isActive, isPending }) =>
                      isPending ? 'pending' : isActive ? 'active' : ''
                    }
                  >
                    MINHAS COMPRAS
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <div className="user-panel">
            <Button
              className="icon-user"
              onClick={handleOpen}
              style={{ color: 'white' }}
            >
              {carrinhoItens.length > 0 && (
                <div className="notification-circle">
                  <span>{carrinhoItens.length}</span>
                </div>
              )}
              <a>
                <i className="fa fa-shopping-bag icon-header"></i>
              </a>
            </Button>

            {user ? (
              <>
                <div className="user-email">{user.email}</div>
                <Button
                  className="icon-user"
                  style={{ color: 'white' }}
                  onClick={signout}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                </Button>
              </>
            ) : (
              <Button className="icon-user" style={{ color: 'white' }}>
                <NavLink
                  className="icon-user"
                  to={{
                    pathname: '/login/auth'
                  }}
                >
                  <i className="fa fa-user icon-header"></i>
                </NavLink>
              </Button>
            )}
          </div>
        </div>
      </div>
      <CartModal open={open} onClose={handleClose} />
    </header>
  )
}
