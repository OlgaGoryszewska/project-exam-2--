import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../services/loginUser'
import logoRound from '../assets/img/logoRound.png'

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [error, setError] = useState('')

    const onSubmit = async (data) => {
        try {
            await loginUser({
                email: data.email,
                password: data.password,
            })
            window.location = '/'
        } catch (err) {
            setError('Error logging in: ' + err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-registration">
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
                <a href="/Register" className="pl-2">
                    Register
                </a>
            </div>
        </form>
    )
}

export default LoginForm
