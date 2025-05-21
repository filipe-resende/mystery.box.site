import React, { memo } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import {
  CardNumber,
  ExpirationDate,
  initMercadoPago,
  SecurityCode
} from '@mercadopago/sdk-react'

const PaymentFormFields: React.FC = () => {
  initMercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY || '')

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '56px',
    borderRadius: '4px',
    border: '1px solid rgb(251, 251, 251)',
    boxSizing: 'border-box',
    padding: '0 14px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: '16px'
  } as const

  const labelStyle = {
    color: '#fff',
    display: 'block',
    marginBottom: '4px'
  } as const
  return (
    <>
      <Box mt={2}>
        <Typography variant="caption" style={labelStyle}>
          Número do Cartão
        </Typography>
        <div style={containerStyle}>
          <CardNumber
            placeholder="Número do Cartão"
            style={{
              fontSize: '16px',
              color: '#fff',
              placeholderColor: '#fff'
            }}
          />
        </div>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption" style={labelStyle}>
              Validade (MM/AA)
            </Typography>
            <div style={containerStyle}>
              <ExpirationDate
                placeholder="MM/AA"
                mode="short"
                style={{
                  fontSize: '16px',
                  color: '#fff',
                  placeholderColor: '#fff'
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" style={labelStyle}>
              Código de Segurança
            </Typography>
            <div style={containerStyle}>
              <SecurityCode
                placeholder="CVC"
                style={{
                  fontSize: '16px',
                  color: '#fff',
                  placeholderColor: '#fff'
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default memo(PaymentFormFields)
