import * as React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim())
    const accepted = cookies.find(cookie =>
      cookie.startsWith('cookiesAccepted=')
    )
    if (!accepted) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    document.cookie =
      'cookiesAccepted=true; path=/; max-age=' + 60 * 60 * 24 * 365 // 1 ano
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: '#000',
        color: '#fff',
        padding: '15px',
        textAlign: 'center',
        zIndex: 9999,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.5)'
      }}
    >
      <p>
        Utilizamos cookies para melhorar a sua experiência.{' '}
        <Link
          to="/termos"
          style={{ color: '#0af', textDecoration: 'underline' }}
        >
          Saiba mais
        </Link>
        .
      </p>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#b01ba5',
          color: '#fff',
          border: '2px solid transparent',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#b01ba5',
            border: '2px solid #b01ba5'
          },
          textTransform: 'none'
        }}
        onClick={handleAccept}
      >
        <strong>Aceitar</strong>
      </Button>
    </div>
  )
}

export default CookieBanner
