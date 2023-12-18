import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../types/payment/Card'
import { processPayment } from '../services/checkoutService'
import { useAuth } from '../context/auth/AuthProvider'
import { Util } from '../util/util'

export default function Checkout() {
  const itens = useSelector((state: any) => state.carrinho.itens)

  function getSubtotal() {
    return itens.reduce((total, item) => total + item.quantity * item.price, 0)
  }
  const { token } = useAuth()

  const [payment, setPayment] = useState<Card>({
    number: '',
    month: '',
    year: '',
    securitycode: '',
    name: '',
    installments: '1'
  })

  const isBtnCreateAccountDisabled = () => {
    return Object.values(payment).every(value => value !== '' && value !== null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPayment(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const total = getSubtotal()

  const handleChekout = async () => {
    const response = await processPayment(payment, itens, token)
    console.log('Resultado do pagamento:', response)
  }

  return (
    <div className="checkout">
      <section
        className="page-top-section"
        style={{
          backgroundImage: `url(/img/page-top-bg/4.jpg)`
        }}
      >
        <div className="page-info">
          <h2>Checkout</h2>
          <div className="site-breadcrumb">
            <a href="">Início</a> /<span>Pagamento</span>
          </div>
        </div>
      </section>
      <section className="contact-page">
        <div className="container">
          <div className="map"></div>
          <div className="row">
            <div className="col-lg-7 order-1 order-lg-1 contact-text text-white">
              <h3 className="checkout-container__title">Detalhes da compra</h3>
              <form className="contact-form">
                <input
                  type="number"
                  name="number"
                  value={payment.number}
                  onChange={handleInputChange}
                  placeholder="digite o número do cartão..."
                  required
                />
                <div className="row">
                  <div className="col-sm">
                    <input
                      type="text"
                      name="month"
                      value={payment.month}
                      onChange={handleInputChange}
                      placeholder="digite o mês do cartão... *"
                      required
                    />
                  </div>

                  <div className="col-sm">
                    <input
                      type="text"
                      name="year"
                      value={payment.year}
                      onChange={handleInputChange}
                      placeholder="digite o ano do Cartão...*"
                      required
                    />
                  </div>
                </div>
                <input
                  type="number"
                  name="securitycode"
                  value={payment.securitycode}
                  onChange={handleInputChange}
                  placeholder="digite o codigo de segurança... *"
                  required
                />
                <input
                  type="text"
                  name="name"
                  value={payment.name}
                  onChange={handleInputChange}
                  placeholder="digite o nome conforme no escrito no cartão...*"
                  required
                />
                <label
                  htmlFor="frutas"
                  style={{
                    fontWeight: 500,
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: '#fff',
                    lineHeight: 1
                  }}
                >
                  PARCELAS
                </label>
                <select
                  id="installments"
                  name="installments"
                  value={payment.installments}
                  required
                  onChange={e =>
                    setPayment({ ...payment, installments: e.target.value })
                  }
                  style={{
                    width: '100%',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.54)',
                    paddingBottom: '20px',
                    marginBottom: '30px',
                    fontWeight: 500,
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: '#fff',
                    lineHeight: 1
                  }}
                >
                  <option style={{ color: 'black' }} value="1">
                    1x de {Util.convertToCurrency(total)}
                  </option>
                  <option style={{ color: 'black' }} value="2">
                    2x de {Util.convertToCurrency(total / 2)}
                  </option>
                  <option style={{ color: 'black' }} value="3">
                    3x de {Util.convertToCurrency(total / 3)}
                  </option>
                </select>
              </form>
            </div>
            <div className="col-lg-5 order-2 order-lg-2 contact-text text-white">
              <div className="container">
                <h3 className="checkout-container__title">Sua compra</h3>
                <div className="checkout-container__subtitle">
                  <div className="col-sm">Produto</div>
                  <div className="col-sm">Subtotal</div>
                </div>
                {itens.map(item => (
                  <div className="checkout-container__itens" key={item.id}>
                    <div className="col-sm center">
                      {item.name} x {item.quantity}
                    </div>
                    <div className="col-sm center">
                      {Util.convertToCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
                <div className="checkout-container__total">
                  <div className="col-sm">Total</div>
                  <div className="col-sm">{Util.convertToCurrency(total)}</div>
                </div>
                <button
                  disabled={!isBtnCreateAccountDisabled()}
                  type="submit"
                  className={`container-btn_submit ${
                    isBtnCreateAccountDisabled()
                      ? 'container-btn-submit__ready '
                      : ''
                  }`}
                  onClick={handleChekout}
                >
                  Confimar Pagamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="newsletter-section">
        <div className="container">
          <h2>Subscribe to our newsletter</h2>
          <form className="newsletter-form">
            <input type="text" placeholder="ENTER YOUR E-MAIL" />
            <button className="site-btn">
              subscribe <img src="/img/icons/double-arrow.png" alt="#" />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
