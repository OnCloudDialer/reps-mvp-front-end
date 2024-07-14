import { Spinner } from '@chakra-ui/react'
import { useRefreshTokenQuery } from '../services/auth/auth'
import { Navigate } from 'react-router-dom'

const Home = () => {
    const { isLoading, isError } = useRefreshTokenQuery()

    if (isError) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            {
                isLoading ? <Spinner /> : <div>Home Page</div>
            }

        </>
    )
}

export default Home