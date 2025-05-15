import React, { useState, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'

export default function Reset() {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)

  const { changeUserPassword, loading, error } = useUser()

  const handleChangeUserPassword = async (e: FormEvent) => {
    e.preventDefault()

    if (!password || !confirmation) return
    if (password !== confirmation) {
      alert('As senhas não coincidem.')
      return
    }

    if (typeof token !== 'string') {
      alert('Token inválido.')
      return
    }

    const result = await changeUserPassword(password, token)
    if (result?.status === 200) {
      setIsPasswordChanged(true)
    } else {
      alert(result?.message || 'Erro ao alterar a senha.')
    }
  }

  const isDisabled = !password || !confirmation || password !== confirmation

  return (
    <div className="login">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="wrapper">
              <form onSubmit={handleChangeUserPassword}>
                {!isPasswordChanged ? (
                  <>
                    <h1>Recuperar senha</h1>

                    <div className="input-box">
                      <input
                        type="password"
                        placeholder="Digite uma nova senha"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <i className="bx bxs-lock"></i>
                    </div>

                    <div className="input-box">
                      <input
                        type="password"
                        placeholder="Confirme sua nova senha"
                        required
                        value={confirmation}
                        onChange={e => setConfirmation(e.target.value)}
                      />
                      <i className="bx bxs-lock"></i>
                    </div>

                    <button
                      type="submit"
                      disabled={isDisabled || loading}
                      className={`btn ${!isDisabled ? 'btn-ready' : ''}`}
                    >
                      {loading ? 'Alterando...' : 'Alterar senha'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                  </>
                ) : (
                  <h1 className="div-form__h6">Senha alterada com sucesso!</h1>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
