import { useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import { API_BASE_URL, API_KEY } from '../constants'
import { CustomAlert } from './CustomAlert'

function UpdateProfileForm() {
    const [avatarUrl, setAvatarUrl] = useState('')

    const [error, setError] = useState(null)
    const [alertMessage, setAlertMessage] = useState({
        message: '',
        show: false,
    })

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
                setAlertMessage({
                    message:
                        'Profile updated successfully! Please refresh the page to see the changes.',
                    show: true,
                })
            } else {
                const errorData = await response.json()
                setError(errorData.error || 'Failed to update profile')
            }
        } catch (err) {
            setError('An error occurred while updating the profile')
            console.error(err)
        }
    }
    const handleAlertClose = () => {
        setAlertMessage({ ...alertMessage, show: false })
    }

    return (
        <form onSubmit={handleUpdateProfile} className="p-4">
            <div className="flex flex-col">
                <h4 className="text-lg font-medium">Change Avatar</h4>
                <label>Avatar URL</label>
                <input
                    type="url"
                    value={avatarUrl}
                    onChange={(event) => setAvatarUrl(event.target.value)}
                    required
                    className="text-field"
                />
            </div>
            <button className="button-blue mt-4" type="submit">
                Update Profile
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {alertMessage.show && (
                <CustomAlert
                    message={alertMessage.message}
                    onClose={handleAlertClose}
                />
            )}
        </form>
    )
}

export default UpdateProfileForm
