import { useState } from 'react'
import { loginUser } from '../services/loginUser'
import logoRound from '../assets/img/logoRound.png'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')

    const handleInputChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        setFormData({
            ...formData,
            [inputName]: inputValue,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await loginUser({
                email: formData.email,
                password: formData.password,
            })
            window.location = '/'
        } catch (error) {
            setError('Error logging in: ' + error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card-registration ">
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="text-field"
            />
            <label>Password</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="text-field"
            />
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
