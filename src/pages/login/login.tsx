import React, { useState } from 'react'
import { ButtonBase } from '@mui/material'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/context/auth/AuthProvider'
import { Regex } from '@/util/util'
import { RegisterForm } from '@/components/form/register'

export default function Login() {
  const navigate = useNavigate()
  const { path } = useParams()
  const { signin } = useAuth()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginError, setIsLoginError] = useState<boolean>()
  const [isFlipped, setIsFlipped] = useState(false)

  const isBtnLoginDesabled = () =>
    Regex.email(login) && password.length ? false : true

  const handleLogin = async e => {
    e.preventDefault()
    const response = await signin(login, password)
    if (!response.hasError && path == 'auth') {
      navigate('/inicio')
    }
    setIsLoginError(response.hasError)
  }

  const handleFlipClick = () => setIsFlipped(!isFlipped)

  return (
    <div className={`login ${isFlipped ? 'flipped' : ''}`}>
      <div className="flip-card">
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-card-front">
            <div className="wrapper">
              <form action="">
                <h1>Login</h1>
                <div className="input-box">
                  <input
                    className={`${isLoginError ? 'form-input__error' : ''}`}
                    type="text"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    placeholder="Digite seu email"
                    required
                    maxLength={50}
                  />
                  <i
                    className={`${
                      isLoginError
                        ? 'bx bxs-error-circle error-color'
                        : 'bx bxs-user'
                    }`}
                  ></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    className={`${isLoginError ? 'form-input__error' : ''}`}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    maxLength={50}
                  />
                  <i
                    className={`${
                      isLoginError
                        ? 'bx bxs-error-circle error-color'
                        : 'bx bxs-lock-alt'
                    }`}
                  ></i>
                  <span hidden={!isLoginError} className="form-input-span">
                    Verifique suas credenciais.
                  </span>
                </div>
                <NavLink to="/login/forgotten" className="remember-forgot">
                  Esqueceu sua senha?
                </NavLink>
                <div className="form-buttom--access">
                  <button
                    disabled={isBtnLoginDesabled()}
                    onClick={handleLogin}
                    className={`btn ${
                      !isBtnLoginDesabled() ? 'btn-ready' : ''
                    }`}
                  >
                    Acessar
                  </button>
                </div>
                <p className="form__p">
                  {'Não possui uma conta? '}
                  <ButtonBase className="register" onClick={handleFlipClick}>
                    Registre-se
                  </ButtonBase>
                </p>
              </form>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="wrapper">
              <div className="btn-div__login">
                {' '}
                <ButtonBase
                  className="btn-back__icon"
                  onClick={handleFlipClick}
                >
                  <i className="bx bx-arrow-back invert"></i>
                </ButtonBase>
              </div>

              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
