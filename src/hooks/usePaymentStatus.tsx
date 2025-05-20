import { useEffect } from 'react'
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel
} from '@microsoft/signalr'
import { useSnackbar } from '@/context/SnackbarContext'

export const useSignalRPaymentStatus = (
  paymentId: number | null,
  onUpdate: () => void
) => {
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    if (!paymentId) return

    const connection: HubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/hub/notificacoes', {
        withCredentials: true
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build()

    const handlePagamentoAtualizado = (data: any) => {
      showSnackbar('🔔 Atualização recebida via SignalR', 'warning')

      if (data?.id == paymentId) {
        onUpdate()
      }
    }

    connection
      .start()
      .then(async () => {
        showSnackbar('✅ SignalR conectado', 'success')

        await connection.invoke('JoinGroup', paymentId.toString())
        connection.on('PagamentoAtualizado', handlePagamentoAtualizado)
      })
      .catch(error => {
        showSnackbar(`❌ Erro ao conectar ao SignalR ${error}`, 'error')
      })

    return () => {
      connection.off('PagamentoAtualizado', handlePagamentoAtualizado)
      connection.stop()
      showSnackbar('❌ SignalR desconectado', 'warning')
    }
  }, [paymentId])
}
