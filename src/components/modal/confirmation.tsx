import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
    textAlign: 'center'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    justifyContent: 'center'
  },
  '& .MuiDialogTitle-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    paddingTop: theme.spacing(3)
  }
}))

interface Props {
  open: boolean
  onClose: () => void
}

export const Confirmation: React.FC<Props> = ({ open, onClose }) => {
  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      sx={{ zIndex: 2000 }}
    >
      <DialogTitle id="confirmation-dialog-title">
        <CheckCircleOutlineIcon color="success" fontSize="large" />
        Conta criada com sucesso!
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Um e-mail de confirmação foi enviado para sua caixa de entrada.
          Verifique e siga as instruções para ativar sua conta.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          Entendi
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}
