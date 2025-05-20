// src/components/GlobalSnackbar.tsx
import React from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

type Props = {
  open: boolean
  message: string
  severity?: AlertColor
  onClose: () => void
}

export default function GlobalSnackbar({
  open,
  message,
  severity = 'info',
  onClose
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
