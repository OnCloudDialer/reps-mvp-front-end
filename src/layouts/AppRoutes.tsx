import { Route, Routes } from 'react-router-dom'
import Register from '../components/Register'
import Login from '../components/Login'
import Home from '../components/Home'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;