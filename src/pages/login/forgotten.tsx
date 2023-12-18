import React, { useState } from 'react'
import { sendEmailResetUserPassword } from '../../services/userService'

export default function Forgotten() {
  const [email, setEmail] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)

  const isBtnLoginDesabled = () => {
    let isDesabled = true

    if (email.length) {
      isDesabled = false
    }

    return isDesabled
  }

  const handleForgottenEmail = async e => {
    e.preventDefault()

    try {
      if (email && email.length) {
        const result = await sendEmailResetUserPassword(email)
        if (result.status == 200) {
          setIsEmailSent(true)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`login`}>
      <div className="flip-card">
        <div className={`flip-card-inner'`}>
          <div className="flip-card-front">
            <div className="wrapper">
              <form action="">
                <h1>Recuperar senha</h1>
                {!isEmailSent && (
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Digite seu email cadastrado"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <i className="bx bxs-user"></i>
                  </div>
                )}
                <h6 className="div-form__h6">
                  {isEmailSent ? (
                    <>
                      O email de recuperação foi enviado com sucesso! Por favor,
                      verifique sua caixa de entrada para mais instruções.
                    </>
                  ) : (
                    <>
                      Enviaremos para sua caixa de entrada um email de
                      recuperação.
                    </>
                  )}
                </h6>
                {!isEmailSent && (
                  <button
                    disabled={isBtnLoginDesabled()}
                    onClick={handleForgottenEmail}
                    className={`btn ${
                      !isBtnLoginDesabled() ? 'btn-ready' : ''
                    }`}
                  >
                    Recuperar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
