import { useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../services/auth/auth'
import { Form, Input, Button, Typography } from 'antd'
import { signUpRequestDTO } from '../services/auth/type'

const Register = () => {
    const navigate = useNavigate()
    const [registerUser, { isLoading }] = useRegisterUserMutation()

    const submitRegisterRequest = async (values: signUpRequestDTO) => {
        await registerUser(values).unwrap()
    }


    return (
        <div className='flex flex-col items-center justify-center gap-7 min-w-[380px]'>
            <div className="flex flex-col w-full justify-center gap-3 items-center">
                <Typography>Create your Account</Typography>
                <Typography>Start making your dreams come true</Typography>
            </div>
            <Form
                name="register-form"
                layout="vertical"
                onFinish={submitRegisterRequest}
                style={{ width: '100%' }}
            >
                <Form.Item
                    name="name"
                    label="Username"
                    rules={[{ required: true, message: 'Please enter a username!' }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please enter a password!' }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <div className="flex items-center justify-center w-full">
                <Typography>Already have an account? <Button type='text' onClick={() => navigate('/login')}>Log in</Button></Typography>
            </div>
        </div >
    )
}

export default Register