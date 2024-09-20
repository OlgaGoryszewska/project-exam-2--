import { useState } from 'react'
import { loginUser } from '../services/loginUser'

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
            window.location = '/Profile'
        } catch (error) {
            setError('Error logging in: ' + error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card-registration">
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="">Login</h2>
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
        </form>
    )
}

export default LoginForm
