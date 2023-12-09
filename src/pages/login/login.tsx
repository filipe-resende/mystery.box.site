import React, { useState } from 'react'
import { Alert, AlertTitle, ButtonBase } from '@mui/material'
import { useAuth } from '../../context/auth/AuthProvider'
import { useNavigate, useParams } from 'react-router-dom'
import Register from '../../types/Register'
import { registerUser } from '../../services/register'
import { Confimation } from '../../components/modal/confirmation'

export default function Login() {
  const { signin } = useAuth()

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    navigate('/inicio')
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFlipped, setIsFlipped] = useState(false)
  const [isError, setError] = useState(false)

  const [register, setRegister] = useState<Register>({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phone: ''
  })

  const { path } = useParams()
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()

    try {
      if (email && password) {
        await signin(email, password)
        if (path == 'auth') {
          navigate('/inicio')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleRegister = async e => {
    try {
      e.preventDefault()
      const registerResult = await registerUser(register)
      if (registerResult.status == 200) {
        handleClickOpen()
      } else if (registerResult.status == 409) {
        setError(true)

        // Use setTimeout para definir o erro como falso após 500ms (0,5 segundos)
        setTimeout(function () {
          setError(false)
        }, 4000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFlipClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegister(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const phoneMask = value => {
    if (!value) return ''
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')
    return value
  }

  const cpfMask = value => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
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
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="UserName or Email"
                    required
                  />
                  <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <i className="bx bxs-lock-alt"></i>
                </div>
                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" />
                    Remeber me
                  </label>
                  <a href="#">Forgot password?</a>
                </div>
                <button onClick={handleLogin} className="btn">
                  Login
                </button>
                <div className="register-link">
                  <p>
                    {"Don't have an account"}?{' '}
                    <ButtonBase
                      style={{ color: '#fff' }}
                      onClick={handleFlipClick}
                    >
                      {' '}
                      Register
                    </ButtonBase>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="wrapper">
              <form action="">
                <h1>Register</h1>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    name="name"
                    value={register.name}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    maxLength={14}
                    placeholder="Digite seu CPF"
                    name="cpf"
                    value={cpfMask(register.cpf)}
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
                    value={phoneMask(register.phone)}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="bx bxs-phone"></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Digite um password"
                    name="password"
                    value={register.password}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="bx bxs-lock-alt"></i>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={register.email}
                    onChange={handleInputChange}
                    required
                  />
                  <i className="bx bx-mail-send"></i>
                </div>

                <div className="col-md-4"></div>
                <button type="submit" className="btn" onClick={handleRegister}>
                  Create Account
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
