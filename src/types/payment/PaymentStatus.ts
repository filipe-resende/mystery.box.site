export default interface PaymentStatus {
  transactionId: number
  status: string
  message: string
  qrCodeBase64?: string
}
