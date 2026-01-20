import useAuth from '@/auth/store'
import {Navigate, Outlet} from 'react-router'

const UserLayout = () => {

  const checkLogin = useAuth((state) => state.checkLogin);

  if(checkLogin())
    return (
    <div className='p-10 flex flex-col items-center'>
        <h1 className='text-2xl font-semibold'>Welcome to the User Dashboard</h1>
        <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur?</p>

        {/* Child routes render here */}
        <Outlet />
    </div>
  )
  else
    return <Navigate to={"/login"} />
}

export default UserLayout
