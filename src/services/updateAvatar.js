import { API_BASE_URL, API_KEY } from '../constants'

export const updateAvatar = async (profileName, accessToken) => {
 
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
            }
        )

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error updating Avatar:', error)
        return null
    }
}
