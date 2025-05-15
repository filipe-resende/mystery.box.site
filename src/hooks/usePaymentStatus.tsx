import { useEffect } from 'react'
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel
} from '@microsoft/signalr'

export const useSignalRPaymentStatus = (
  paymentId: number | null,
  onUpdate: () => void
) => {
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
      console.log('🔔 Atualização recebida via SignalR:', data)

      if (data?.id === paymentId) {
        onUpdate()
      }
    }

    connection
      .start()
      .then(async () => {
        console.log('✅ SignalR conectado')
        await connection.invoke('JoinGroup', paymentId.toString())
        connection.on('PagamentoAtualizado', handlePagamentoAtualizado)
      })
      .catch(error => {
        console.error('❌ Erro ao conectar ao SignalR:', error)
      })

    return () => {
      connection.off('PagamentoAtualizado', handlePagamentoAtualizado)
      connection.stop()
      console.log('❌ SignalR desconectado')
    }
  }, [paymentId])
}
