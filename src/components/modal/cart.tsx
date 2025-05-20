import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { IconButton, Button, Grid, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from 'react-redux'
import {
  removerItem,
  atualizarItem,
  diminuirItem,
  AppDispatch,
  RootState
} from '../../redux/store'
import { Link } from 'react-router-dom'
import { Util } from '../../util/util'

interface Props {
  open: boolean
  onClose: () => void
}

const style = {
  position: 'fixed' as const,
  top: '12vh',
  right: '22vh',
  width: 400,
  maxHeight: '80vh',
  color: '#fff',
  background: 'linear-gradient(45deg, #501755 0%, #231342 100%)',
  border: '2px solid #b01ba5',
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  borderRadius: '12px',
  zIndex: 9999,

  '@media (max-width:600px)': {
    width: '90%',
    right: '5%',
    top: '5vh'
  }
}

const CartModal: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const itens = useSelector((state: RootState) => state.carrinho.itens)

  const handleAumentarQuantidade = (id: number) => {
    dispatch(atualizarItem({ id }))
  }

  const handleDiminuirQuantidade = (id: number) => {
    dispatch(diminuirItem({ id }))
  }

  const handleRemoverItem = (id: number) => {
    dispatch(removerItem(id))
  }

  const getSubtotal = () =>
    itens.reduce((total, item) => total + item.quantity * item.unitPrice, 0)

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6" color="#b01ba5" fontWeight="bold">
            Meu Carrinho
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              backgroundColor: '#b01ba5',
              color: '#fff',
              borderRadius: '8px',
              padding: '6px',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#8c1582'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        {itens.map(item => (
          <Paper
            style={{
              backgroundImage: `url('/img/slider-bg-2.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            key={item.id}
            sx={{
              p: 2,
              mb: 1,
              color: '#fff'
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img
                    className="image-container"
                    src={item.pictureUrl}
                    alt={item.title}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 0,
                      flexShrink: 0
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      color="#fff"
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="#ccc">
                      {Util.convertToCurrency(item.unitPrice)} cada
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={4} textAlign="right">
                <IconButton
                  size="small"
                  onClick={() => handleDiminuirQuantidade(item.id)}
                  sx={{ color: '#fff' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography component="span" mx={1} color="#fff">
                  {item.quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleAumentarQuantidade(item.id)}
                  sx={{ color: '#fff' }}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleRemoverItem(item.id)}
                  sx={{ color: '#fff' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Grid container justifyContent="space-between" mt={2}>
          <Typography variant="subtitle1">Subtotal:</Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="#b01ba5">
            {Util.convertToCurrency(getSubtotal())}
          </Typography>
        </Grid>

        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#b01ba5',
            color: '#fff',
            border: '2px solid transparent',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#b01ba5',
              border: '2px solid #b01ba5'
            },
            textTransform: 'none'
          }}
          disabled={itens.length === 0}
        >
          <strong>Finalizar Compra</strong>
        </Button>
      </Box>
    </Modal>
  )
}

export default CartModal
