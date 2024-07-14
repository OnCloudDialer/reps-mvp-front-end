import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Link, Text } from '@chakra-ui/react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useRefreshTokenQuery, useRegisterUserMutation } from '../services/auth/auth'
import { signUpRequestDTO } from '../services/auth/type'
import { useForm } from 'react-hook-form'

const Register = () => {
    const navigate = useNavigate()
    const [registerUser, { isLoading }] = useRegisterUserMutation()
    const { isSuccess } = useRefreshTokenQuery()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<signUpRequestDTO>()

    const submitRegisterRequest = async (values: signUpRequestDTO) => {
        await registerUser(values).unwrap()
    }

    if (isSuccess) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='flex flex-col items-center justify-center gap-7 min-w-[380px]'>
            <div className="flex flex-col w-full justify-center gap-3 items-center">
                <Text fontWeight={600} fontSize={'xx-large'}>Create your Account</Text>
                <Text fontWeight={400} fontSize={'medium'}>Start making your dreams come true</Text>
            </div>
            <form onSubmit={handleSubmit(submitRegisterRequest)} className='w-full flex flex-col items-start justify-start gap-8'>
                <div className='w-full flex flex-col items-start justify-start gap-5'>
                    <FormControl isInvalid={errors.name ? true : false}>
                        <FormLabel>Name</FormLabel>
                        <Input {...register('name', { required: "Name Is Required", })} size={'md'} type='text' />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.email ? true : false}>
                        <FormLabel>Email </FormLabel>
                        <Input {...register('email', { required: "Email Is Required", })} size={'md'} type='email' />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password ? true : false}>
                        <FormLabel>Password</FormLabel>
                        <Input {...register('password', { required: "Password Is Required", })} size={'md'} type='password' />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                        <FormHelperText>Minium 8 Character Password</FormHelperText>
                    </FormControl>
                </div>
                <div className='w-full'>
                    <Button type='submit' colorScheme='facebook' isLoading={isLoading} className='w-full'>Create Account</Button>
                </div>
            </form>
            <div className="flex items-center justify-center w-full">
                <Text>Already have an account? <Link onClick={() => navigate('/login')}>Log in</Link></Text>
            </div>
        </div >
    )
}

export default Register