import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import App from './App'
import { initTheme } from './utils/theme'

initTheme();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
