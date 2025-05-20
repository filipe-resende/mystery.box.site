import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useCheckout } from '@/hooks/useCheckout'
import { Util } from '@/lib/util'
import Bottom from '@/components/bottom/bottom'

import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Paper
} from '@mui/material'
import MercadoPagoCardForm from '@/components/payments/mercadopago/cardForm'
import MercadoPagoPixForm from '@/components/payments/mercadopago/pixForm'
import { RootState } from '@/redux/store'

export default function Checkout() {
  const itens = useSelector((state: RootState) => state.carrinho.itens)
  const total = itens.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  )

  const { processPayment } = useCheckout()

  const [paymentMethod, setPaymentMethod] = useState<
    'credit_card' | 'pix' | null
  >(null)

  return (
    <div className="checkout">
      <section
        className="page-top-section"
        style={{ backgroundImage: `url(/img/page-top-bg/4.jpg)` }}
      >
        <div className="page-info">
          <h2>Checkout</h2>
          <div className="site-breadcrumb">
            <a href="/">Início</a> /<span>Pagamento</span>
          </div>
        </div>
      </section>

      <section className="contact-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 contact-text text-white">
              <Typography variant="h5" gutterBottom>
                Detalhes da compra
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Forma de Pagamento
              </Typography>
              <RadioGroup
                row
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value as any)}
              >
                <FormControlLabel
                  value="credit_card"
                  control={<Radio sx={{ color: '#fff' }} />}
                  label="Cartão de Crédito"
                />
                <FormControlLabel
                  value="pix"
                  control={<Radio sx={{ color: '#fff' }} />}
                  label="PIX"
                />
              </RadioGroup>

              {paymentMethod === 'credit_card' && <MercadoPagoCardForm />}

              {paymentMethod === 'pix' && <MercadoPagoPixForm />}
            </div>

            <div className="col-lg-5 contact-text text-white">
              <Typography variant="h5" gutterBottom>
                Sua compra
              </Typography>
              <Paper
                sx={{ p: 2, backgroundColor: 'transparent' }}
                elevation={3}
              >
                {itens.map(item => (
                  <Box
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                    sx={{
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      pb: 1
                    }}
                  >
                    <Typography>
                      {item.title} x {item.quantity}
                    </Typography>
                    <Typography>
                      {Util.convertToCurrency(item.quantity * item.unitPrice)}
                    </Typography>
                  </Box>
                ))}
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">
                    {Util.convertToCurrency(total)}
                  </Typography>
                </Box>
              </Paper>
            </div>
          </div>
        </div>
      </section>

      <Bottom />
    </div>
  )
}
