import React from 'react'
import { usePurchaseHistory } from '@/hooks/usePurchaseHistory'
import { Util } from '@/lib/util'

export default function Purchases() {
  const { purchases, loading, error } = usePurchaseHistory()

  return (
    <div>
      <section
        className="page-top-section"
        style={{ backgroundImage: `url(img/page-top-bg/1.jpg)` }}
      >
        <div className="page-info">
          <h2>Minhas Compras</h2>
          <div className="site-breadcrumb">
            <a href="/">Início</a> / <span>Minhas Compras</span>
          </div>
        </div>
      </section>

      <section className="games-single-page">
        <div className="container">
          <h3 className="mb-4">Histórico de Compras</h3>

          {loading && <p>Carregando...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && purchases.length === 0 && (
            <p>Nenhuma compra encontrada.</p>
          )}

          {purchases.length > 0 && (
            <div className="table-responsive">
              <table className="table table-dark table-bordered text-white">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Data da Compra</th>
                    <th>Status de Pagamento</th>
                    <th>Email</th>
                    <th>Key</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((compra, index) => (
                    <tr key={compra.id}>
                      <td>{index + 1}</td>
                      <td>{compra.productName}</td>
                      <td>{compra.quantity} </td>
                      <td>
                        {compra.quantity}x{' '}
                        {Util.convertToCurrency(compra.unitPrice)}
                      </td>
                      <td>
                        {new Date(compra.purchaseDate).toLocaleDateString()}
                      </td>
                      <td>
                        <span
                          className={
                            compra.status === 'Enviado'
                              ? 'text-success'
                              : 'text-warning'
                          }
                        >
                          {compra.status}
                        </span>
                      </td>
                      <td>{compra.email}</td>
                      <td>
                        {compra.key ? (
                          <span className="text-info">{compra.key}</span>
                        ) : (
                          <span className="text-muted">Aguardando envio</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
