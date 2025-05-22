import React, { useState } from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useSignalRPaymentStatus } from '@/hooks/usePaymentStatus'
import PaymentStatus from '@/types/payment/PaymentStatus'
import { Response, Result } from '@/types/Reponse'
import { RootState } from '@/redux/store'
import { useSnackbar } from '@/context/SnackbarContext'

const MercadoPagoPixForm = () => {
  const [paymentId, setPaymentId] = useState<number | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showSnackbar } = useSnackbar()
  const [status, setStatus] = useState<
    'idle' | 'processing' | 'success' | 'error'
  >('idle')

  const itens = useSelector((state: RootState) => state.carrinho.itens)
  const total = itens.reduce(
    (acc: number, item: any) => acc + item.quantity * item.price,
    0
  )
  const itemIds = itens.map((item: any) => item.id)

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
      showSnackbar('❌ Erro ao buscar status real:', err)
      setStatus('error')
    }
  })

  const handleCheckoutPix = async () => {
    setError(null)
    setLoading(true)
    setStatus('idle')

    try {
      const res = await axios.post<Response<PaymentStatus>>(
        `${process.env.REACT_APP_API}/payment/pix`,
        {
          transactionAmount: total,
          description: 'Compra via PIX',
          Cards: itemIds
        },
        { withCredentials: true }
      )

      if (res.data.isSuccess) {
        setQrCode(res.data.value.qrCodeBase64)
        setPaymentId(res.data.value.transactionId)
        setStatus('processing')
      } else {
        throw new Error('Falha ao iniciar pagamento via PIX.')
      }
    } catch (err: any) {
      showSnackbar('❌ Erro ao processar pagamento PIX:', err)
      setError(err?.message || 'Erro inesperado ao processar pagamento.')
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box mt={2}>
      <Typography variant="body2" sx={{ color: '#fff', mb: 2 }}>
        Clique abaixo para gerar o QR Code PIX.
      </Typography>

      {qrCode && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <img
            src={`data:image/png;base64,${qrCode}`}
            alt="QR Code PIX"
            style={{ maxWidth: 300 }}
          />
          <Typography variant="body2" sx={{ color: '#ccc', mt: 1 }}>
            Escaneie o QR Code com seu app bancário.
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {status === 'success' && (
        <Typography color="success.main" variant="body2" sx={{ mt: 2 }}>
          Pagamento confirmado com sucesso!
        </Typography>
      )}

      {status === 'processing' && (
        <Typography color="info.main" variant="body2" sx={{ mt: 2 }}>
          Aguardando confirmação do pagamento via PIX...
        </Typography>
      )}

      {status !== 'success' && (
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleCheckoutPix}
          disabled={loading || !!qrCode}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: '#fff' }} />
          ) : (
            'Gerar QR Code PIX'
          )}
        </Button>
      )}
    </Box>
  )
}

export default MercadoPagoPixForm
