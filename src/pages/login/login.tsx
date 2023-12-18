import React, { useState } from 'react'
import { ButtonBase, Checkbox } from '@mui/material'
import { useAuth } from '../../context/auth/AuthProvider'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Register from '../../types/Register'
import { registerUser } from '../../services/userService'
import { Confimation } from '../../components/modal/confirmation'
import { Mask, Regex, Util } from '../../util/util'

export default function Login() {
  const navigate = useNavigate()

  const { path } = useParams()
  const { signin } = useAuth()
  const [open, setOpen] = React.useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginError, setIsLoginError] = useState<boolean>()
  const [isRegisterError, setIsRegisterError] = useState(false)
  const [checked, setChecked] = React.useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [register, setRegister] = useState<Register>({
    name: '',
    email: '',
    password: '',
    confimation: '',
    cpf: '',
    phone: ''
  })

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)
  // navigate('/inicio')

  const handleAcceptTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChecked(event.target.checked)

  const isBtnCreateAccountDisabled = () => {
    const name = Util.isEmpty(register.name)
    const email = Regex.email(register.email)
    const cpf = Regex.cpf(register.cpf)
    const phone = Regex.phone(register.phone)
    const password = Util.compareStrings(
      register.password,
      register.confimation
    )

    return !name && email && cpf && checked && password && phone
  }

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

  const handleRegister = async e => {
    e.preventDefault()
    const result = await registerUser(register)
    if (result.status == 200) {
      handleClickOpen()
    } else if (result.status == 409) {
      setIsRegisterError(true)
    }
  }

  const handleFlipClick = () => setIsFlipped(!isFlipped)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegister(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

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
                  {'Não possui uma conta? '}{' '}
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

              <form>
                <h1> Registre-se</h1>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    name="name"
                    value={register.name}
                    onChange={handleInputChange}
                    required
                    maxLength={50}
                  />
                  <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    maxLength={14}
                    placeholder="Digite seu CPF"
                    name="cpf"
                    value={Mask.cpf(register.cpf)}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="bx bx-fingerprint"></i>
                </div>
                <div className="input-box">
                  <input
                    type="tel"
                    placeholder="Digite seu telefone"
                    name="phone"
                    maxLength={15}
                    value={Mask.phone(register.phone)}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="bx bxs-phone"></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Digite uma senha"
                    name="password"
                    value={register.password}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="bx bxs-lock-alt"></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Confirme sua senha"
                    name="confimation"
                    value={register.confimation}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="bx bxs-lock-alt"></i>
                </div>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Digite um e-mail"
                    name="email"
                    value={register.email}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="bx bx-mail-send"></i>
                </div>
                <p className="form-p__accept">
                  <Checkbox
                    name="accept"
                    checked={checked}
                    onChange={handleAcceptTerm}
                    inputProps={{ 'aria-label': 'controlled' }}
                    style={{ color: '#fff' }}
                  />{' '}
                  Eu aceito os{' '}
                  <a target="_blank" href="/termos">
                    Termos e Politica de privacidade
                  </a>{' '}
                  do site.
                </p>

                <div className="col-md-4"></div>
                <button
                  type="submit"
                  disabled={!isBtnCreateAccountDisabled()}
                  className={`btn ${
                    isBtnCreateAccountDisabled() ? 'btn-ready' : ''
                  }`}
                  onClick={handleRegister}
                >
                  Criar Conta
                </button>

                <Confimation open={open} onClose={handleClose}></Confimation>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
