import { useState } from 'react'
import ButtonSwitch from './ButtonSwitch'
import { registerUser } from '../services/registerUser'

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
        <form onSubmit={handleSubmit} className="card-registration">
            {error && <p className="text-red-500">{error}</p>} {}
            <h2 className="pb-4">Register</h2>
            <label>Full Name</label>
            <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                placeholder="Name"
                className="text-field"
            />
            <label>Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email (must be @stud.noroff.no)"
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
            <label>Bio</label>
            <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Bio (max 160 characters)"
                className="text-field"
            />
            <label>Avatar</label>
            <input
                type="text"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleInputChange}
                placeholder="Avatar URL"
                className="text-field"
            />
            <input
                type="text"
                name="avatarAlt"
                value={formData.avatarAlt}
                onChange={handleInputChange}
                placeholder="Avatar Alt Text"
                className="hidden"
            />
            <label>Banner</label>
            <input
                type="text"
                name="bannerUrl"
                value={formData.bannerUrl}
                onChange={handleInputChange}
                placeholder="Banner URL"
                className="text-field"
            />
            <input
                type="text"
                name="bannerAlt"
                value={formData.bannerAlt}
                onChange={handleInputChange}
                placeholder="Banner Alt Text"
                className="hidden"
            />
            <div className="flex flex-row py-4 justify-between">
                <p>Are you a venue manager?</p>
                <ButtonSwitch
                    onChange={handleSwitchChange}
                    checked={formData.venueManager}
                />
            </div>
            <button type="submit" className="button-blue">
                Register
            </button>
        </form>
    )
}

export default RegistrationForm
