import { useState } from 'react'
import ButtonSwitch from './ButtonSwitch'
import { registerUser } from '../services/registerUser'
import logoRound from '../assets/img/logoRound.png'

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

        const errors = []
        setError('')

        // Validate name (no punctuation symbols apart from underscore)
        const name = formData.name
        const punctuationRegex = /[!"#$%&'()*+,\-./:;<=>?@[\]^`{|}~]/
        if (punctuationRegex.test(name)) {
            errors.push(
                'Name must not contain punctuation symbols apart from underscore (_).'
            )
        }

        // Validate email (must be a valid stud.noroff.no email address)
        const email = formData.email
        const emailRegex = /^[^\s@]+@stud\.noroff\.no$/
        if (!emailRegex.test(email)) {
            errors.push('Email must be a valid stud.noroff.no email address.')
        }

        // Validate password (at least 8 characters)
        const password = formData.password
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters.')
        }

        // Validate bio (less than 160 characters if set)
        const bio = formData.bio
        if (bio && bio.length > 160) {
            errors.push('Bio must be less than 160 characters.')
        }

        // Validate avatar URL and alt text
        const avatarUrl = formData.avatarUrl
        const avatarAlt = formData.avatarAlt || ''
        if (avatarUrl) {
            try {
                new URL(avatarUrl)
            } catch {
                errors.push('Avatar URL must be a valid URL.')
            }
            if (avatarAlt.length > 120) {
                errors.push('Avatar alt text must be less than 120 characters.')
            }
        } else if (avatarAlt) {
            errors.push('Avatar alt text requires avatar URL to be set.')
        }

        // Validate banner URL and alt text
        const bannerUrl = formData.bannerUrl
        const bannerAlt = formData.bannerAlt || ''
        if (bannerUrl) {
            try {
                new URL(bannerUrl)
            } catch {
                errors.push('Banner URL must be a valid URL.')
            }
            if (bannerAlt.length > 120) {
                errors.push('Banner alt text must be less than 120 characters.')
            }
        } else if (bannerAlt) {
            errors.push('Banner alt text requires banner URL to be set.')
        }

        if (errors.length > 0) {
            setError(errors.join('\n'))
            return
        }

        const avatar = avatarUrl
            ? {
                  url: avatarUrl,
                  alt: avatarAlt,
              }
            : undefined

        const banner = bannerUrl
            ? {
                  url: bannerUrl,
                  alt: bannerAlt,
              }
            : undefined

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
            {error && <p className="text-red-500">{error}</p>}
            <img
                className="w-16 h-16 mx-auto mt-14"
                src={logoRound}
                alt="logo"
            />
            <h2 className="py-4 mx-auto">Register</h2>

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
                className="text-field hidden"
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
                className="text-field hidden"
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
            <div className="flex my-4">
                <p className="text-dark-gray">Already have an account? </p>
                <a href="/login" className="pl-2">
                    Login
                </a>
            </div>
        </form>
    )
}

export default RegistrationForm
