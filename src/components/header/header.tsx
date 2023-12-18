import React, { useState } from 'react'

import { Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Button, ButtonBase, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { useAuth } from '../../context/auth/AuthProvider'
import CartModal from '../modal/cart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
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
            </ul>
          </nav>
          <div className="nav-icon-painel">
            <IconButton onClick={handleOpen} className="btn-painel ">
              {carrinhoItens.length > 0 && (
                <div className="shopcart-icon__length">
                  <span>{carrinhoItens.length}</span>
                </div>
              )}
              <ShoppingCartIcon className="icon"></ShoppingCartIcon>
            </IconButton>

            {user ? (
              <>
                <IconButton className="btn-painel " onClick={signout}>
                  <AccountCircleIcon className="icon icon__account" />
                  <div className="icon-account__div">
                    <p className="icon-account__p">Minhas Compras</p>
                    <p className="icon-account__p">Logout</p>
                  </div>
                </IconButton>
                {/* <IconButton className="btn-painel " onClick={signout}>
                  <LogoutIcon className="icon faEllipsisV" />
                </IconButton> */}
              </>
            ) : (
              <IconButton className="btn-painel ">
                <NavLink
                  to={{
                    pathname: '/login/auth'
                  }}
                >
                  <PersonIcon className="icon faEllipsisV" />
                </NavLink>
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <CartModal open={open} onClose={handleClose} />
    </header>
  )
}
