import { useEffect, useState } from 'react'
import Loading from '../components/common/Loading'
import AppRoutesProvider from '../providers/AppRoutesProvider'
import { useRefreshTokenMutation } from '../services/auth/auth'
import { GetUserAuthToken } from '../helpers'

const ApplicationProvider = () => {
    const [triggerRefresh, { isLoading }] = useRefreshTokenMutation()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const refreshToken = GetUserAuthToken()
        if (refreshToken) {
            triggerRefresh()
                .finally(() => setChecked(true))
        } else {
            setChecked(true)
        }
    }, [])

    if (!checked || isLoading) {
        return <Loading />
    }

    return <AppRoutesProvider />
}

export default ApplicationProvider