import { API_BASE_URL } from '../constants'
import { API_KEY } from '../constants'

export const registerVenue = async (venue) => {
    try {
        const accessToken = localStorage.getItem('token')
        const response = await fetch(`${API_BASE_URL}/holidaze/venues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(venue),
        })
        if (!response.ok) {
            throw new Error('Error registering venue')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error registering venue', error)
        throw error
    }
}
