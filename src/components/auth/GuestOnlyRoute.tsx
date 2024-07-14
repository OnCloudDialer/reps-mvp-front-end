import { useAppSelector } from '../../app/hooks'
import { Navigate, Outlet } from 'react-router-dom'
import { AppRouteSlugs } from '../../services/routes'
import GuestLayout from '../../layouts/GuestLayout'

const GuestOnlyRoute = () => {
    const { user } = useAppSelector(state => state.authUser)

    if (user) {
        return <Navigate to={AppRouteSlugs.home} />
    }

    return <GuestLayout><Outlet /></GuestLayout>
}

export default GuestOnlyRoute