export function formatNumberToBRL(number) {
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
