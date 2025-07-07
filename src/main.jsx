import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/Usercontext.jsx'
import ToastProvider from './Context/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </UserProvider>
  </BrowserRouter>
)
