import React from 'react'
import { useParams } from 'react-router-dom'

export default function Active() {
  const { token } = useParams()

  return (
    <div className={`login`}>
      <div className="flip-card">
        <div className={`flip-card-inner'`}>
          <div className="flip-card-front">
            <div className="wrapper">
              <form action="">
                <h1>Usuário Ativado!</h1>
                <div className="input-box">
                  <input type="text" placeholder="Digite seu email" required />
                  <i className="bx bxs-user"></i>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
