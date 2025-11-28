'use client'
import React from "react"
import { useNavigate } from 'react-router-dom'
import "../../styles/Header.css"

function Header() {
  const navigate = useNavigate()

  const handleScrollToAventura = (e) => {
    e.preventDefault()
    const target = document.getElementById('tu-aventura')
  
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleLogoClick = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <header className="header">
      <div className="container">
        <div className="container_header">
          <h2 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            Patagonia Trip
          </h2>
          <nav>
            <h2 className="nav-menu">
              50% OFF EN TU PRIMERA RESERVA
            </h2>
          </nav>
          <a href="#tu-aventura" className="boton_primario" onClick={handleScrollToAventura}>
            Ver Paquetes
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
