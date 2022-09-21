export {}

import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')

if(!container) throw new Error('Missing `root`.')

console.info("¡I live!")

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
