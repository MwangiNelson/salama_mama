import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './contexts/AppContexts.jsx'
import { ConversationsProvider } from './contexts/ConversationsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AppProvider>
      <ConversationsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConversationsProvider>
    </AppProvider>
  </>,
)
