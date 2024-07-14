
import { Route, Routes } from 'react-router-dom'
import WithAuthRoute from '../components/auth/WithAuthRoute'
import { AppRoutes, GuestRoutes } from '../services/routes'
import GuestOnlyRoute from '../components/auth/GuestOnlyRoute'

const AppRoutesProvider = () => {
    return (
        <Routes>
            <Route element={<GuestOnlyRoute />}>
                {
                    GuestRoutes.map(({ component, path }, index) => <Route key={`Guest-route-${index}`} path={path} element={component} />)
                }
            </Route>
            <Route element={<WithAuthRoute />}>
                {
                    AppRoutes.map(({ component, path }, index) => <Route key={`App-route-${index}`} path={path} element={component} />)
                }
            </Route>
        </Routes>
    )
}

export default AppRoutesProvider