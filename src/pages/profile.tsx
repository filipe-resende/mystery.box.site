import React, { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { ProfileFormData } from '@/types/ProfileFormData'
import Button from '@mui/material/Button'
export default function EditProfile() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    phone: ''
  })

  const [errors, setErrors] = useState<Partial<ProfileFormData>>({})
  const [message, setMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { getUserProfile, updateUserProfile, loading } = useUser()

  useEffect(() => {
    async function loadProfile() {
      const profile = await getUserProfile()
      if (profile) setFormData(profile)
    }

    loadProfile()
  }, [])

  const validate = () => {
    const newErrors: Partial<ProfileFormData> = {}

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    setMessage(null)

    const result = await updateUserProfile(formData)

    if (result?.hasError) {
      setMessage(result.message)
    } else {
      setMessage('Perfil atualizado com sucesso!')
    }

    setIsSubmitting(false)
  }

  return (
    <div>
      <section
        className="page-top-section"
        style={{ backgroundImage: `url(img/page-top-bg/1.jpg)` }}
      >
        <div className="page-info">
          <h2>Editar Perfil</h2>
          <div className="site-breadcrumb">
            <a href="/">Início</a> / <span>Editar Perfil</span>
          </div>
        </div>
      </section>

      <section className="games-single-page">
        <div className="container">
          <h3 className="mb-4 text-center">Informações do Perfil</h3>

          {message && (
            <p
              className={
                message.includes('sucesso') ? 'text-success' : 'text-danger'
              }
            >
              {message}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Telefone</label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>

            <div className="text-center mt-4">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  backgroundColor: '#b01ba5',
                  color: '#feefd9',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: '#b01ba5',
                    border: '2px solid #b01ba5'
                  },
                  textTransform: 'none'
                }}
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
