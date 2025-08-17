import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <GoogleOAuthProvider clientId='521121442677-tlc1uo550plajm617memkcjaf02iogjb.apps.googleusercontent.com'>
        <App />
     </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
