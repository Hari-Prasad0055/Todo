import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.jsx"
import React from 'react';

import AuthContext from './context/authContext.jsx';


createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
  </AuthContext>
)
