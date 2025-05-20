import React, { useState } from 'react'
import { ButtonBase, Checkbox } from '@mui/material'
import { Mask, Regex, Util } from '@/lib/util'
import { Register } from '@/types/Register'
import { useUser } from '@/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { Feedback } from '../dialog/feedback'
import { Response } from '@/types/Reponse'

type Props = {
  onBack: () => void
}

export const RegisterForm = ({ onBack }: Props) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [checked, setChecked] = useState(false)
  const [isRegisterError, setIsRegisterError] = useState<Response>(null)

  const { registerUser } = useUser()
  const [register, setRegister] = useState<Register>({
    identificationType: 'CPF'
  })

  const handleClose = () => {
    setOpen(false)
    if (isRegisterError?.isSuccess) navigate('/login')
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setRegister(prev => ({ ...prev, [name]: value }))
  }

  const handleAcceptTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChecked(event.target.checked)

  const isBtnCreateAccountDisabled = () => {
    if (step === 1) {
      const name = !Util.isEmpty(register?.name)
      const lastName = !Util.isEmpty(register?.lastName)
      const phone = !Util.isEmpty(register?.phone)
      const idType = !Util.isEmpty(register?.identificationType)
      const idNumber = Regex.cpf(register?.identificationNumber)

      return !(name && lastName && idType && idNumber && phone)
    }

    if (step === 2) {
      const email = Regex.email(register?.email)
      const password = Util.compareStrings(
        register?.password,
        register?.confimation
      )
      return !(email && password && checked)
    }

    return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      if (!isBtnCreateAccountDisabled()) {
        setStep(2)
        return
      }
    }

    const result = await registerUser(register)
    setIsRegisterError(result)
    setOpen(true)
  }

  const feedback = () => {
    if (!isRegisterError) return null
    return isRegisterError.isSuccess ? (
      <Feedback
        open={open}
        onClose={handleClose}
        type="success"
        title="Conta criada com sucesso!"
        message="Um e-mail de confirmação foi enviado para sua caixa de entrada."
        buttonText="Entendi"
      />
    ) : (
      <Feedback
        open={open}
        onClose={handleClose}
        type="error"
        message="Este e-mail já está cadastrado. Tente recuperar a senha ou usar outro."
        buttonText="Fechar"
      />
    )
  }

  return (
    <form onSubmit={handleRegister}>
      <div className="btn-div__login">
        <ButtonBase
          className="btn-back__icon"
          onClick={step === 2 ? () => setStep(1) : onBack}
        >
          <i className="bx bx-arrow-back invert"></i>
        </ButtonBase>
      </div>

      <h1>{step === 1 ? 'Registre-se' : 'Finalizar Cadastro'}</h1>

      {step === 1 && (
        <>
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
              placeholder="Digite seu sobrenome"
              name="lastName"
              value={register.lastName}
              onChange={handleInputChange}
              required
            />
            <i className="bx bxs-user-detail"></i>
          </div>

          <div className="input-box">
            <input
              type="tel"
              placeholder="Digite seu telefone"
              name="phone"
              value={Mask.phone(register.phone)}
              onChange={handleInputChange}
              required
            />
            <i className="bx bxs-phone"></i>
          </div>

          <div className="input-box">
            <select
              name="identificationType"
              value={register.identificationType}
              onChange={handleInputChange}
              required
            >
              <option value="CPF">CPF (Brasil)</option>
            </select>
            <i className="bx bx-id-card"></i>
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Número do documento"
              name="identificationNumber"
              value={Mask.cpf(register.identificationNumber)}
              onChange={handleInputChange}
              required
            />
            <i className="bx bx-barcode-reader"></i>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="input-box">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              value={register.email}
              onChange={handleInputChange}
              required
            />
            <i className="bx bx-mail-send"></i>
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
              Termos e Política de Privacidade
            </a>
            .
          </p>
        </>
      )}

      <button
        type="submit"
        className={`btn ${!isBtnCreateAccountDisabled() ? 'btn-ready' : ''}`}
        disabled={isBtnCreateAccountDisabled()}
      >
        {step === 1 ? 'Próximo' : 'Criar Conta'}
      </button>

      {feedback()}
    </form>
  )
}
