import React, { useState } from 'react'
import { changeUserPassword } from '../../services/userService'
import { useParams } from 'react-router-dom'

export default function Reset() {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')

  const [IsPasswordChanged, setIsPasswordChanged] = useState(false)

  const isBtnAlterPassword = () => {
    let isDesabled = true

    if (password.length && confirmation.length) {
      isDesabled = false
    }

    return isDesabled
  }

  const handleChangeUserPassword = async e => {
    e.preventDefault()

    try {
      if (password.length && confirmation.length) {
        const result = await changeUserPassword(password, token)
        if (result.status == 200) {
          setIsPasswordChanged(true)
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
                {!IsPasswordChanged ? (
                  <>
                    <h1>Recuperar senha</h1>{' '}
                    <div className="input-box">
                      <input
                        type="text"
                        placeholder="Digite uma nova senha"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box">
                      <input
                        type="text"
                        placeholder="Confime sua nova senha"
                        required
                        value={confirmation}
                        onChange={e => setConfirmation(e.target.value)}
                      />
                      <i className="bx bxs-user"></i>
                    </div>
                    <button
                      disabled={isBtnAlterPassword()}
                      onClick={handleChangeUserPassword}
                      className={`btn ${
                        !isBtnAlterPassword() ? 'btn-ready' : ''
                      }`}
                    >
                      Alterar senha
                    </button>
                  </>
                ) : (
                  <h1 className="div-form__h6">Senha alterada!</h1>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
