import { useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import { API_BASE_URL, API_KEY } from '../constants'

function UpdateProfileForm() {
    const [avatarUrl, setAvatarUrl] = useState('')

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleUpdateProfile = async (event) => {
        event.preventDefault()

        const profileName = loadLocalStorage('profile').name
        const accessToken = loadLocalStorage('token')

        const payload = {
            avatar: { url: avatarUrl },
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/holidaze/profiles/${profileName}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                        'X-Noroff-API-Key': API_KEY,
                    },
                    body: JSON.stringify(payload),
                }
            )

            if (response.ok) {
                await response.json()
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
            <div className='flex flex-col'>
                <label>Avatar URL</label>
                <input
                    type="url"
                    value={avatarUrl}
                    onChange={(event) => setAvatarUrl(event.target.value)}
                    required
                    className='text-field'
                />
     
            </div>
            <button type="submit">Update Profile</button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </form>
    )
}

export default UpdateProfileForm
