import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FRVBWebsite from './FRVBWebsite.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FRVBWebsite />
  </StrictMode>,
)
