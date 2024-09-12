import { useState } from 'react'
import { loginUser } from '../api/LoginUser'
import { handleLogout } from '../handlers/logout'

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
            alert('Logged in successfully!')
        } catch (error) {
            setError('Error logging in: ' + error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border rounded p-2 w-full"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="border rounded p-2 w-full"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                Login
            </button>
            <button onClick={handleLogout}>Logout</button>
        </form>
    )
}

export default LoginForm
