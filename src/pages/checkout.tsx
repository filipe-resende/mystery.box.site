import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
  const [valorParcela, setValorParcela] = useState<number | null>(null)

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

              {paymentMethod === 'credit_card' && (
                <MercadoPagoCardForm onInstallmentChange={setValorParcela} />
              )}

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
                    gap={2}
                    alignItems="center"
                    mb={2}
                    sx={{
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      pb: 2
                    }}
                  >
                    {/* Imagem */}
                    <Box
                      component="img"
                      src={item.pictureUrl}
                      alt={item.title}
                      sx={{
                        width: 64,
                        height: 64,
                        objectFit: 'cover',
                        borderRadius: 2,
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 0 6px rgba(0,0,0,0.3)'
                      }}
                    />

                    {/* Informações */}
                    <Box flexGrow={1}>
                      <Typography
                        fontWeight="bold"
                        color="#fff"
                        mb={0.3}
                        lineHeight={1.2}
                      >
                        {item.title} x {item.quantity}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="rgba(255,255,255,0.7)"
                        lineHeight={1.2}
                      >
                        {item.description}
                      </Typography>
                    </Box>

                    {/* Preço total */}
                    <Typography fontWeight="bold" color="#fff">
                      {Util.convertToCurrency(item.quantity * item.unitPrice)}
                    </Typography>
                  </Box>
                ))}

                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="h6">{'Total :'}</Typography>
                  <Typography variant="h6">
                    {Util.convertToCurrency(valorParcela ?? total)}
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
