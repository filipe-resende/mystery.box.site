import React from 'react'
import { Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-left-pic">
          <Image src="img/footer-left-pic.png" alt="" />
        </div>
        <div className="footer-right-pic">
          <Image src="/img/footer-right-pic.png" alt="" />
        </div>
        <a href="#" className="footer-logo">
          <Image src="/img/logo.png" alt="" />
        </a>
        <ul className="main-menu footer-menu">
          <li>
            <NavLink to="/inicio">INÍCIO</NavLink>
          </li>
          <li>
            <NavLink to="/sobre">DÚVIDAS FREQUENTES</NavLink>
          </li>
          <li>
            <NavLink to="/termos">TERMOS DE USO</NavLink>
          </li>
        </ul>
        <div className="copyright">
          <a href="">Colorlib</a> 2018 @ All rights reserved
        </div>
      </div>
    </footer>
  )
}
