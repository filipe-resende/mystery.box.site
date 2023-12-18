import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes } from './routes/routes'
import { BrowserRouter as Router } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import '@mui/material'
import store from './redux/store'
import { Provider } from 'react-redux'
import { AuthProvider } from './context/auth/AuthProvider'
import Header from './components/header/header'
import Footer from './components/footer/footer'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </AuthProvider>
  </Provider>
)
