import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import RootLayout from './pages/RootLayout.tsx'
import App from './App.tsx'
import About from './pages/About.tsx'
import Login from './pages/Login.tsx'
import Services from './pages/Services.tsx'
import Signup from './pages/Signup.tsx'
import UserLayout from './pages/users/UserLayout.tsx'
import ProfileEdit from './pages/users/ProfileEdit.tsx'
import UserProfile from './pages/users/UserProfile.tsx'
import UserHome from './pages/users/UserHome.tsx'

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
        <Route path='/user' element={<UserLayout />}>
          <Route index element={<UserHome />}/>
          <Route path='profile' element={<UserProfile />} />
          <Route path='profile/edit' element={<ProfileEdit />} />
          
          
        </Route>
        
      </Route>

    </Routes>
  </BrowserRouter>,
)
