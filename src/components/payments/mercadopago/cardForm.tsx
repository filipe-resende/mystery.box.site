import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  CircularProgress
} from '@mui/material'
import { useSelector } from 'react-redux'
import { createCardToken, getInstallments } from '@mercadopago/sdk-react'
import axios from 'axios'
import { Card } from '@/types/payment/Card'
import { Regex } from '@/lib/util'
import MercadoPagoSecureFields from './secureFields'
import { useSignalRPaymentStatus } from '@/hooks/usePaymentStatus'
import PaymentStatus from '@/types/payment/PaymentStatus'
import { Response, Result } from '@/types/Reponse'
import { RootState } from '@/redux/store'
import { CardToken } from '@mercadopago/sdk-react/esm/coreMethods/util/types'
import { Installments } from '@mercadopago/sdk-react/esm/coreMethods/getInstallments/types'
import { useSnackbar } from '@/context/SnackbarContext'

type Props = {
  onInstallmentChange?: (amount: number) => void
}

const MercadoPagoCardForm = ({ onInstallmentChange }: Props) => {
  const { showSnackbar } = useSnackbar()

  const [paymentId, setPaymentId] = useState<number | null>(null)
  const [cardToken, setCardToken] = useState<CardToken>(null)
  const [installments, setInstallments] = useState<Installments[]>([])

  const [payment, setPayment] = useState<Card>({
    name: '',
    installments: '',
    identificationNumber: '',
    identificationType: 'CPF'
  })

  const isFormValid =
    payment.name.trim().length > 5 &&
    Regex.cpf(payment.identificationNumber) &&
    payment.installments !== '' &&
    cardToken?.id

  useEffect(() => {
    const fetchToken = async () => {
      const isValid =
        payment.name.trim().length > 5 &&
        Regex.cpf(payment.identificationNumber)

      if (!isValid) return

      try {
        const response = await createCardToken({
          cardholderName: payment.name.trim(),
          identificationType: payment.identificationType,
          identificationNumber: payment.identificationNumber.replace(/\D/g, '')
        })

        setCardToken(response)

        const installments = await getInstallments({
          amount: total.toString(),
          bin: response.first_six_digits
        })

        setInstallments(installments)
      } catch (err) {
        showSnackbar('❌ Erro ao gerar token do cartão.', 'error')
      }
    }

    fetchToken()
  }, [payment])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'processing' | 'success' | 'error'
  >('idle')

  const itens = useSelector((state: RootState) => state.carrinho.itens)
  const total = itens.reduce(
    (acc: number, item: any) => acc + item.quantity * item.unitPrice,
    0
  )

  const handleInstallmentChange = (selected: string) => {
    setPayment(prev => ({ ...prev, installments: selected }))

    const selectedInstallment = installments[0]?.payer_costs.find(
      i => String(i.installments) === selected
    )

    if (selectedInstallment && onInstallmentChange) {
      onInstallmentChange(selectedInstallment.total_amount)
    }
  }

  useSignalRPaymentStatus(paymentId, async () => {
    try {
      const { data } = await axios.get<Result<PaymentStatus>>(
        `${process.env.REACT_APP_API}/payment/${paymentId}`,
        { withCredentials: true }
      )

      if (data.isSuccess && data.value.status === 'approved') {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      showSnackbar('❌Erro ao buscar status real.', 'error')
      setStatus('error')
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formatted = value

    if (name === 'identificationNumber') {
      formatted = Regex.formatCPF(value)
    }

    setPayment(prev => ({ ...prev, [name]: formatted }))
  }

  const handleCheckout = async () => {
    setError(null)
    setLoading(true)
    setStatus('idle')

    try {
      if (!payment.name.trim()) throw new Error('Nome do cartão obrigatório.')
      if (!Regex.cpf(payment.identificationNumber))
        throw new Error('CPF inválido.')

      const res = await axios.post<Response<PaymentStatus>>(
        `${process.env.REACT_APP_API}/payment`,
        {
          token: cardToken.id,
          paymentMethodId: cardToken.card_id,
          installments: payment.installments,
          firstSixDigits: cardToken.first_six_digits,
          transactionAmount: total,
          payer: {
            identification: {
              type: payment.identificationType,
              number: payment.identificationNumber
            }
          },
          itens
        },
        { withCredentials: true }
      )

      if (res.data.isSuccess) {
        setPaymentId(res.data.value.transactionId)
        setStatus('processing')
      } else {
        throw new Error('Falha ao iniciar pagamento.')
      }
    } catch (err: any) {
      showSnackbar('❌Erro ao processar pagamento.', 'error')
      setError(err?.message || 'Erro inesperado ao processar pagamento.')
      setStatus('error')
    } finally {
      setLoading(false)
    }
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
        <Select
          labelId="parcelas-label"
          value={payment.installments}
          name="installments"
          label="Parcelas"
          onChange={e => handleInstallmentChange(e.target.value)}
          displayEmpty
          sx={{
            color: '#fff',
            '& .MuiSelect-select': {
              borderRadius: '4px'
            }
          }}
        >
          {(!installments[0]?.payer_costs ||
            installments[0].payer_costs.length === 0) && (
            <MenuItem value="">
              <em>Selecione a quantidade de parcelas</em>
            </MenuItem>
          )}

          {installments[0]?.payer_costs.map(i => (
            <MenuItem key={i.installments} value={String(i.installments)}>
              {i.recommended_message}
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

      {status === 'idle' && (
        <Button
          variant="contained"
          fullWidth
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1rem',
            backgroundColor: '#b01ba5',
            color: '#feefd9',
            border: '2px solid transparent',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#b01ba5',
              border: '2px solid #b01ba5'
            },
            textTransform: 'none'
          }}
          onClick={handleCheckout}
          disabled={loading || !isFormValid}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: '#fff' }} />
          ) : (
            'Confirmar Pagamento'
          )}
        </Button>
      )}
    </Box>
  )
}

export default MercadoPagoCardForm
