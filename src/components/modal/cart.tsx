import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { IconButton, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ButtonBase from '@mui/material/ButtonBase'
import { Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { removerItem } from '../../redux/store'
import { NavLink } from 'react-router-dom'
import { Util } from '../../util/util'

interface Props {
  open: boolean
  onClose: () => void
}

const style = {
  position: 'fixed' as const,
  top: 0,
  right: 0,
  height: '100vh',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column'
}

const CartModal: React.FC<Props> = ({ open, onClose }) => {
  const itens = useSelector((state: any) => state.carrinho.itens)
  const dispatch = useDispatch()

  const handleRemoverItem = (id: number) => {
    dispatch(removerItem(id))
  }

  function getSubtotal() {
    return itens.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Grid
          container
          style={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography id="modal-modal-description">Shopping Cart:</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{ alignSelf: 'flex-end' }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        {itens.map(item => (
          <Paper
            key={item.id}
            sx={{
              p: 2,
              backgroundColor: theme =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
            }}
            style={{ marginTop: '5px' }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                style={{
                  alignSelf: 'center'
                }}
              >
                <ButtonBase sx={{ width: 80, height: 64 }}>
                  <Image alt="complex" src={item.thumb} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs container direction="row" alignItems="center">
                    <Grid item xs>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'end',
                          width: '100%'
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          {item.name}
                        </Typography>
                        <IconButton
                          onClick={() => handleRemoverItem(item.id)}
                          style={{ marginLeft: 'auto' }}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1" component="div">
                      {item.quantity} x{' '}
                      {Util.convertToCurrency(item.price * item.quantity)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Grid container style={{ justifyContent: 'center', marginTop: 'auto' }}>
          <Grid
            container
            style={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography id="modal-modal-description">Subtotal:</Typography>
            <Typography id="modal-modal-description">
              {Util.convertToCurrency(getSubtotal())}
            </Typography>
          </Grid>
          {itens.length > 0 ? (
            <NavLink style={{ width: '100%' }} to={'/checkout'}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: '100%' }}
              >
                Checkout
              </Button>
            </NavLink>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              style={{ width: '100%' }}
              disabled
            >
              Checkout
            </Button>
          )}
        </Grid>
      </Box>
    </Modal>
  )
}

export default CartModal
