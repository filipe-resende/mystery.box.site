import React from 'react'
import { Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { NavLink } from 'react-router-dom'

export default function userMenu({ open, onClose, anchorEl, onLogout }: any) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        style: {
          background: 'linear-gradient(to right, #722bb7 0%, #2f0961 100%)',
          color: '#fff'
        }
      }}
    >
      <MenuItem component={NavLink} to="/perfil" onClick={onClose}>
        <AccountCircleIcon fontSize="small" style={{ marginRight: 8 }} /> Perfil
      </MenuItem>
      <MenuItem component={NavLink} to="/minhas-compras" onClick={onClose}>
        <ShoppingCartCheckoutIcon fontSize="small" style={{ marginRight: 8 }} />{' '}
        Minhas Compras
      </MenuItem>
      <MenuItem
        onClick={() => {
          onLogout()
          onClose()
        }}
      >
        <LogoutIcon fontSize="small" style={{ marginRight: 8 }} /> Logout
      </MenuItem>
    </Menu>
  )
}
