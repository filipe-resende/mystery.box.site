import React, { useState } from 'react'
import { Card } from '@/types/payment/Card'
import { Regex, Util } from '@/util/util'
import { createCardToken, initMercadoPago } from '@mercadopago/sdk-react'
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress
} from '@mui/material'
import { useSelector } from 'react-redux'
import MercadoPagoSecureFields from './secureFields'
import axios from 'axios'
import { useSignalRPaymentStatus } from '@/hooks/usePaymentStatus'
import PaymentStatus from '@/types/payment/PaymentStatus'
import { Response } from '@/types/Reponse'

const MercadoPagoCardForm = () => {
  initMercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY || '')

  const [paymentId, setPaymentId] = useState<number | null>(null)
  const [payment, setPayment] = useState<Card>({
    name: '',
    installments: '1',
    identificationNumber: '',
    identificationType: 'CPF'
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'processing' | 'success' | 'error'
  >('idle')

  const itens = useSelector((state: any) => state.carrinho.itens)
  const total = itens.reduce((acc, item) => acc + item.quantity * item.price, 0)
  const itemIds = useSelector((state: any) =>
    state.carrinho.itens.map((item: any) => item.id)
  )

  useSignalRPaymentStatus(paymentId, async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/payment/${paymentId}`,
        {
          withCredentials: true
        }
      )

      const status = response.data?.status
      if (status === 'approved') {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('❌ Erro ao buscar status real:', error)
      setStatus('error')
    }
  })

  const handleCheckout = async () => {
    setError(null)
    setLoading(true)
    setStatus('idle')

    try {
      if (!payment.name.trim()) throw new Error('Nome do cartão obrigatório.')
      if (!Regex.cpf(payment.identificationNumber))
        throw new Error('CPF inválido.')

      const response = await createCardToken({
        cardholderName: payment.name.trim(),
        identificationType: payment.identificationType,
        identificationNumber: payment.identificationNumber.replace(/\D/g, '')
      })

      const res = await axios.post<Response<PaymentStatus>>(
        `${process.env.REACT_APP_API}/payment`,
        {
          token: response.id,
          paymentMethodId: response.card_id,
          installments: payment.installments,
          firstSixDigits: response.first_six_digits,
          transactionAmount: total,
          payer: {
            identification: {
              type: payment.identificationType,
              number: payment.identificationNumber
            }
          },
          Cards: itemIds
        },
        { withCredentials: true }
      )

      if (res.data.isSuccess) {
        setPaymentId(res.data.value.transactionId)
        setStatus('processing')
      }
    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err)
      setError(err?.message || 'Erro inesperado ao processar pagamento.')
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'identificationNumber') {
      formattedValue = Regex.formatCPF(value)
    }

    setPayment(prev => ({ ...prev, [name]: formattedValue }))
  }

  const muiInputSx = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
      '&:hover fieldset': { borderColor: '#c313b7' },
      '&.Mui-focused fieldset': { borderColor: '#c313b7' }
    },
    '& .MuiInputLabel-root': {
      color: '#fff',
      '&.Mui-focused': { color: '#c313b7' }
    },
    input: { color: '#fff' }
  }

  return (
    <Box mt={2}>
      <Typography variant="body2" sx={{ color: '#fff', mb: 2 }}>
        Preencha os dados do cartão com atenção.
      </Typography>

      <MercadoPagoSecureFields />

      <TextField
        label="Nome no Cartão"
        name="name"
        value={payment.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={muiInputSx}
      />

      <TextField
        label="CPF"
        name="identificationNumber"
        value={payment.identificationNumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 14 }}
        sx={muiInputSx}
      />

      <FormControl fullWidth margin="normal" sx={muiInputSx}>
        <InputLabel id="parcelas-label">Parcelas</InputLabel>
        <Select
          labelId="parcelas-label"
          value={payment.installments}
          name="installments"
          label="Parcelas"
          onChange={e =>
            setPayment({ ...payment, installments: e.target.value })
          }
          sx={{ color: '#fff' }}
        >
          {[1, 2, 3].map(i => (
            <MenuItem key={i} value={String(i)} sx={{ color: '#fff' }}>
              {i}x de {Util.convertToCurrency(total / i)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      {status === 'processing' && (
        <Typography color="info.main" variant="body2" sx={{ mt: 2 }}>
          Aguardando confirmação do pagamento...
        </Typography>
      )}

      {status === 'success' && (
        <Typography color="success.main" variant="body2" sx={{ mt: 2 }}>
          Pagamento aprovado com sucesso!
        </Typography>
      )}

      {status === 'error' && !error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          Algo deu errado. Tente novamente.
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleCheckout}
        disabled={loading || status === 'processing'}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: '#fff' }} />
        ) : (
          'Confirmar Pagamento'
        )}
      </Button>
    </Box>
  )
}

export default MercadoPagoCardForm
