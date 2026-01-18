import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import RootLayout from './pages/RootLayout.tsx'
import App from './App.tsx'
import About from './pages/About.tsx'
import Login from './pages/Login.tsx'
import Services from './pages/Services.tsx'
import Signup from './pages/Signup.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<App />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/services' element={<Services />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/add more' element={<App />}/>
      </Route>

    </Routes>
  </BrowserRouter>,
)
