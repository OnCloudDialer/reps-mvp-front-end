import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Link, Text } from '@chakra-ui/react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLoginUserMutation, useRefreshTokenQuery } from '../services/auth/auth'
import { useForm } from 'react-hook-form'
import { loginRequestDTO } from '../services/auth/type'

const Login = () => {
    const navigate = useNavigate()
    const [login, { isLoading }] = useLoginUserMutation()
    const { isSuccess } = useRefreshTokenQuery()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<loginRequestDTO>()

    const onSubmit = async (values: loginRequestDTO) => {
        await login(values).unwrap()
    }
    if (isSuccess) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='flex flex-col items-center justify-center gap-7 min-w-[380px]'>
            <div className="flex flex-col w-full justify-center gap-3 items-center">
                <Text fontWeight={600} fontSize={'xx-large'}>Login to your Account</Text>
                <Text fontWeight={400} fontSize={'medium'}>Star making your dreams come true.</Text>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-start justify-start gap-8'>
                <div className='w-full flex flex-col items-start justify-start gap-4'>
                    <FormControl isInvalid={errors.email ? true : false}>
                        <FormLabel>Email </FormLabel>
                        <Input {...register('email', { required: 'Email is Required!', })} size={'md'} type='email' />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password ? true : false}>
                        <FormLabel>Password</FormLabel>
                        <Input {...register('password', {
                            required: 'This is required', minLength: {
                                value: 4,
                                message: 'Minimum length should be 4'
                            },
                        })} size={'md'} type='password' />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                </div>
                <div className="flex w-full justify-between items-center">
                    <Checkbox defaultChecked>Remember Me</Checkbox>
                    <Link>Forgot Password?</Link>
                </div>
                <div className='w-full'>
                    <Button colorScheme='facebook' className='w-full' type='submit' isLoading={isLoading}>Login</Button>
                </div>

            </form>
            <div className="flex items-start justify-start w-full">
                <Text>Don't have an account?
                    <Link onClick={() => navigate('/register')}>Sign Up</Link>
                </Text>
            </div>
        </div>
    )
}

export default Login
