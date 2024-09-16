
import { API_BASE_URL } from '../constants'

export const findVenueByName = async (query) => {
    try {
        const url = `${API_BASE_URL}/holidaze/venues/search?q=${query}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const data = await response.json()
        return data.data
    } catch (error) {
        console.error('Error fetching venues', error)
        return []
    }
}
