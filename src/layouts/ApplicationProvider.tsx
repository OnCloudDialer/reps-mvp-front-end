import Loading from '../components/common/Loading'
import AppRoutesProvider from '../providers/AppRoutesProvider'
import { useRefreshTokenQuery } from '../services/auth/auth'

const ApplicationProvider = () => {
    const { isLoading } = useRefreshTokenQuery()
    if (isLoading) {
        return <Loading />
    }

    return <AppRoutesProvider />
}

export default ApplicationProvider