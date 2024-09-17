import { API_BASE_URL } from '../constants'

export const registerVenue = async (venue) => {

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(venue),
        })
        if (!response.ok) {
            throw new Error('Error registering user')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error registering user:', error)
        throw error
    }
}

