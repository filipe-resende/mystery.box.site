// src/context/snackbar/SnackbarContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react'

import GlobalSnackbar from '../components/ui/GlobalSnackbar'

declare global {
  interface Window {
    __GLOBAL_SNACKBAR__?: (
      message: string,
      severity?: 'success' | 'error' | 'info' | 'warning'
    ) => void
  }
}

type Severity = 'success' | 'error' | 'info' | 'warning'

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: Severity) => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
)

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context)
    throw new Error('useSnackbar must be used within SnackbarProvider')
  return context
}

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<Severity>('info')

  const showSnackbar = useCallback((msg: string, sev: Severity = 'info') => {
    setMessage(msg)
    setSeverity(sev)
    setOpen(true)
  }, [])

  const handleClose = () => setOpen(false)

  useEffect(() => {
    window.__GLOBAL_SNACKBAR__ = showSnackbar
  }, [showSnackbar])

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <GlobalSnackbar
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  )
}
