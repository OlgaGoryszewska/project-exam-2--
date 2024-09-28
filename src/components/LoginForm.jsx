import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../services/loginUser'
import logoRound from '../assets/img/logoRound.png'
import { CustomAlert } from './CustomAlert'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

//Pages

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [alertMessage, setAlertMessage] = useState({
        message: '',
        show: false,
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            await loginUser({
                email: data.email,
                password: data.password,
            })
            setAlertMessage({
                message: 'Nice to have you log in! Enjoy your stay.',
                type: 'success',
                show: true,
            })
        } catch (err) {
            setError('Error logging in: ' + err.message)
        }
    }
    const handleCloseAlert = () => {
        setAlertMessage({ ...alert, show: false })
        navigate('/')
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-registration"
            >
                {error && <p className="text-red-500">{error}</p>}
                <img
                    className="w-16 h-16 mx-auto mt-14"
                    src={logoRound}
                    alt="logo"
                />
                <h2 className="mx-auto mt-4 mb-6">Login</h2>

                <label>Email</label>
                <input
                    type="email"
                    {...register('email', {
                        required: 'Email is required.',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address.',
                        },
                    })}
                    placeholder="Email"
                    className="text-field"
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}

                <label>Password</label>
                <input
                    type="password"
                    {...register('password', {
                        required: 'Password is required.',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters.',
                        },
                    })}
                    placeholder="Password"
                    className="text-field"
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}

                <button type="submit" className="button-blue mt-4">
                    Login
                </button>
                <div className="flex my-4">
                    <p className="text-dark-gray">Do not have an account? </p>
                    <Link to="/Register">
                        <p className="pl-2">Register</p>
                    </Link>
                </div>
            </form>
            <div>
                {alertMessage.show && (
                    <CustomAlert
                        message={alertMessage.message}
                        onClose={handleCloseAlert}
                    />
                )}
            </div>
        </>
    )
}

export default LoginForm
