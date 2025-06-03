import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Typography } from 'antd'
import { useLoginUserMutation } from '../../services/auth/auth'
import { loginRequestDTO } from '../../services/auth/type'

const Login = () => {
    const navigate = useNavigate()
    const [login, { isLoading }] = useLoginUserMutation()

    const onSubmit = async (values: loginRequestDTO) => {
        await login(values).unwrap()
    }

    return (
        <div className="flex flex-col items-center justify-center gap-7 min-w-[380px]">

            <Form
                name="login-form"
                layout="vertical"
                onFinish={onSubmit}
                style={{ width: '100%' }}
            >
                <Form.Item
                    name="email"
                    label="Username"
                    rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>

            <div className="flex items-start justify-start w-full">
                <Typography>
                    Don't have an account?{' '}
                    <Button type='text' onClick={() => navigate('/register')}>Sign Up</Button>
                </Typography>
            </div>
        </div>
    )
}

export default Login
