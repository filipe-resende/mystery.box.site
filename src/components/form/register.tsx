import React, { useState } from 'react'
import { Checkbox } from '@mui/material'
import { Mask, Regex, Util } from '@/util/util'
import Register from '@/types/Register'
import { useUser } from '@/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { Feedback } from '../dialog/feedback'
import { Response } from '@/types/Reponse'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
    if (isRegisterError.isSuccess) navigate('/login')
  }

  const [checked, setChecked] = useState(false)
  const [isRegisterError, setIsRegisterError] = useState<Response>(null)

  const { registerUser } = useUser()

  const [register, setRegister] = useState<Register>({})

  const handleAcceptTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChecked(event.target.checked)

  const isBtnCreateAccountDisabled = () => {
    const name = Util.isEmpty(register?.name)
    const email = Regex.email(register?.email)
    const cpf = Regex.cpf(register?.cpf)
    const phone = Regex.phone(register?.phone)
    const password = Util.compareStrings(
      register?.password,
      register?.confimation
    )

    return !name && email && cpf && checked && password && phone
  }

  const feedback = () => {
    if (!isRegisterError) return null
    if (isRegisterError.isSuccess) {
      return (
        <Feedback
          open={open}
          onClose={handleClose}
          type="success"
          title="Conta criada com sucesso!"
          message="Um e-mail de confirmação foi enviado para sua caixa de entrada."
          buttonText="Entendi"
        />
      )
    } else {
      return (
        <Feedback
          open={open}
          onClose={handleClose}
          type="error"
          message="Este e-mail já está cadastrado. Tente recuperar a senha ou usar outro."
          buttonText="Fechar"
        />
      )
    }
  }

  const handleRegister = async e => {
    e.preventDefault()
    const result = await registerUser(register)
    setIsRegisterError(result)
    setOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegister(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <form>
      <h1>Registre-se</h1>

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
        />
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
        className={`btn ${isBtnCreateAccountDisabled() ? 'btn-ready' : ''}`}
        onClick={handleRegister}
      >
        Criar Conta
      </button>
      {feedback()}
    </form>
  )
}
