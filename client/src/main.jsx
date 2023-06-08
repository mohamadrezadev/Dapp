import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import 'bootswatch/dist/cyborg/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import 'react-notifications/lib/notifications.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode > 
     <BrowserRouter>
      <ThirdwebProvider activeChain="ethereum">
      <App />
    </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
