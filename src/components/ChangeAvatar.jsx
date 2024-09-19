import { useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import { API_BASE_URL, API_KEY } from '../constants'

function UpdateProfileForm() {
    const [avatarUrl, setAvatarUrl] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [bio, setBio] = useState('')
    const [venueManager, setVenueManager] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleUpdateProfile = async (e) => {
        e.preventDefault()

        const profileName = loadLocalStorage('profile').name
        const accessToken = loadLocalStorage('token')

        const payload = {
            bio,
            avatar: { url: avatarUrl },
            banner: { url: bannerUrl },
            venueManager,
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/holidaze/profiles/${profileName}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`, // Ensure proper token format
                        'X-Noroff-API-Key': API_KEY,
                    },
                    body: JSON.stringify(payload),
                }
            )

            if (response.ok) {
                const data = await response.json()
                setSuccess('Profile updated successfully!')
            } else {
                const errorData = await response.json()
                setError(errorData.error || 'Failed to update profile')
            }
        } catch (err) {
            setError('An error occurred while updating the profile')
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleUpdateProfile} className="p-4">
            <div>
                <label>Avatar URL</label>
                <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Banner URL</label>
                <input
                    type="url"
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                />
            </div>
            <div>
                <label>Bio</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>
            <div>
                <label>Venue Manager</label>
                <input
                    type="checkbox"
                    checked={venueManager}
                    onChange={(e) => setVenueManager(e.target.checked)}
                />
            </div>
            <button type="submit">Update Profile</button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </form>
    )
}

export default UpdateProfileForm
