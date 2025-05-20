import React from 'react'
import { createRoot } from 'react-dom/client'
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
import { SnackbarProvider } from './context/SnackbarContext'
import AppInitializer from './components/AppInitializer'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <SnackbarProvider>
      <AuthProvider>
        <Router>
          <AppInitializer />
          <Header />
          <Routes />
          <Footer />
        </Router>
      </AuthProvider>
    </SnackbarProvider>
  </Provider>
)
