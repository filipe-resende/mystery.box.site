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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

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
  type: 'success' | 'error'
  title?: string
  message?: string
  buttonText?: string
}

export const Feedback: React.FC<Props> = ({
  open,
  onClose,
  type,
  title,
  message,
  buttonText
}) => {
  const isSuccess = type === 'success'

  const icon = isSuccess ? (
    <CheckCircleOutlineIcon color="success" fontSize="large" />
  ) : (
    <ErrorOutlineIcon color="error" fontSize="large" />
  )

  const defaultTitle = isSuccess ? 'Tudo certo!' : 'Ocorreu um problema'
  const defaultMessage = isSuccess
    ? 'Sua ação foi concluída com sucesso.'
    : 'Não foi possível concluir sua solicitação. Tente novamente mais tarde.'

  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="feedback-dialog-title"
      open={open}
      sx={{ zIndex: 2000 }}
    >
      <DialogTitle
        id="feedback-dialog-title"
        sx={{ color: isSuccess ? 'success.main' : 'error.main' }}
      >
        {icon}
        {title || defaultTitle}
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
          {message || defaultMessage}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant={isSuccess ? 'contained' : 'outlined'}
          color={isSuccess ? 'primary' : 'error'}
          onClick={onClose}
        >
          {buttonText || 'Fechar'}
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}
