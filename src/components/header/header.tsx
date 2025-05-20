import React, { useState, useRef } from 'react'
import { Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useAuth } from '@/context/auth/AuthProvider'
import CartModal from '../modal/cart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import UserMenu from '../modal/userMenu'

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const iconRef = useRef<HTMLButtonElement | null>(null)

  const carrinhoItens = useSelector((state: any) => state.carrinho.itens)
  const { user, signout } = useAuth()

  const handleCartOpen = () => setCartOpen(true)
  const handleCartClose = () => setCartOpen(false)

  const toggleUserMenu = () => setUserMenuOpen(prev => !prev)
  const closeUserMenu = () => setUserMenuOpen(false)

  return (
    <div className="container">
      <header className="header-section">
        <div className="header-warp">
          <div className="header-bar-warp">
            <NavLink to="/inicio" className="header-bar-figure">
              <Image
                src="/img/logo.png"
                alt="Logo"
                style={{ width: '160px', height: 'auto', objectFit: 'contain' }}
              />
            </NavLink>

            <nav className="top-nav-area w-100">
              <ul className="main-menu primary-menu">
                <li>
                  <NavLink
                    to="/inicio"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    INÍCIO
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sobre"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    DÚVIDAS FREQUENTES
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/termos"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    TERMOS DE USO
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="nav-icon-painel">
              <Tooltip title="Carrinho">
                <IconButton onClick={handleCartOpen} className="btn-painel">
                  {carrinhoItens.length > 0 && (
                    <div className="shopcart-icon__length">
                      <span>{carrinhoItens.length}</span>
                    </div>
                  )}
                  <ShoppingCartIcon className="icon" />
                </IconButton>
              </Tooltip>

              {user ? (
                <>
                  <Tooltip title="Minha Conta">
                    <IconButton
                      onClick={toggleUserMenu}
                      className="btn-painel"
                      ref={iconRef}
                    >
                      <AccountCircleIcon className="icon" />
                    </IconButton>
                  </Tooltip>
                  <UserMenu
                    open={userMenuOpen}
                    onClose={closeUserMenu}
                    anchorEl={iconRef.current}
                    onLogout={signout}
                  />
                </>
              ) : (
                <Button className="btn-painel">
                  <NavLink
                    to="/login/auth"
                    className={({ isActive }) =>
                      isActive ? 'active-link' : ''
                    }
                  >
                    <span className="login-text">Login | Registrar-se</span>
                    <PersonIcon style={{ fontSize: '24px' }} className="icon" />
                  </NavLink>
                </Button>
              )}
            </div>
          </div>
        </div>

        <CartModal open={cartOpen} onClose={handleCartClose} />
      </header>
    </div>
  )
}
