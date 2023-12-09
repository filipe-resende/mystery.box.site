import React from 'react'
import { Alert } from 'react-bootstrap'

export default function Alerts() {
  return (
    <Alert key={'danger'} variant={'danger'}>
      This is a {'danger'} alert—check it out!
    </Alert>
  )
}
