import { useAppSelector } from '../../app/hooks'
import { Navigate, Outlet } from 'react-router-dom'
import { AppRouteSlugs } from '../../services/routes'
import AppLayout from '../../layouts/AppLayout'

const WithAuthRoute = () => {
    const { user } = useAppSelector(state => state.authUser)

    if (!user) {
        return <Navigate to={AppRouteSlugs.login} />
    }

    return <AppLayout><Outlet /></AppLayout>
}

export default WithAuthRoute