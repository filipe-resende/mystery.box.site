import React from 'react'
import { Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { NavLink } from 'react-router-dom'

export default function userMenu({ open, onClose, anchorEl, onLogout }: any) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem component={NavLink} to="/compras" onClick={onClose}>
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
