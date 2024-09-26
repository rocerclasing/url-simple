import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
//context
import UserProvider from "./context/UserProvider.jsx"


createRoot(document.getElementById('root')).render(
  <UserProvider> 
       <BrowserRouter> 
            <App />
       </BrowserRouter>
  </UserProvider> 
  
)
