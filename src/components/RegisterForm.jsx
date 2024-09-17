import { useState } from 'react'
import { registerUser } from '../services/registerUser'
import ButtonSwitch from './ButtonSwitch'

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        bio: '',
        avatarUrl: '',
        avatarAlt: '',
        bannerUrl: '',
        bannerAlt: '',
        venueManager: false,
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

    const handleSwitchChange = (checked) => {
        setFormData({
            ...formData,
            venueManager: checked,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const avatar =
            formData.avatarUrl === ''
                ? undefined
                : {
                      url: formData.avatarUrl,
                      alt: formData.avatarAlt,
                  }

        const banner =
            formData.bannerUrl === ''
                ? undefined
                : {
                      url: formData.bannerUrl,
                      alt: formData.bannerAlt,
                  }

        try {
            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                bio: formData.bio,
                avatar: avatar,
                banner: banner,
                venueManager: formData.venueManager,
            }

            await registerUser(newUser)
            alert('User registered successfully!')
        } catch (error) {
            setError('Error registering user: ' + error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>} {}
            <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                placeholder="Name"
                className="border rounded p-2 w-full"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email (must be @stud.noroff.no)"
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
            <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Bio (max 160 characters)"
                className="border rounded p-2 w-full"
            />
            <input
                type="text"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleInputChange}
                placeholder="Avatar URL"
                className="border rounded p-2 w-full"
            />
            <input
                type="text"
                name="avatarAlt"
                value={formData.avatarAlt}
                onChange={handleInputChange}
                placeholder="Avatar Alt Text"
                className="border rounded p-2 w-full"
            />
            <input
                type="text"
                name="bannerUrl"
                value={formData.bannerUrl}
                onChange={handleInputChange}
                placeholder="Banner URL"
                className="border rounded p-2 w-full"
            />
            <input
                type="text"
                name="bannerAlt"
                value={formData.bannerAlt}
                onChange={handleInputChange}
                placeholder="Banner Alt Text"
                className="border rounded p-2 w-full"
            />

                <ButtonSwitch onChange={handleSwitchChange}
                 checked={formData.venueManager} />

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                Register
            </button>
        </form>
    )
}

export default RegistrationForm
