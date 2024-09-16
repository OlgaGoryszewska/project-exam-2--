import { API_BASE_URL, API_KEY } from '../constants'

export const fetchBookings = async () => {
    console.log('fetchBookings')
    try {
        const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
            },
        })

        if (!response.ok) {
            console.log('response', response)
            throw new Error(response.statusText)
        }

        const data = await response.json()
        const bookedDates = data.data.map((booking) => booking.date)
        return bookedDates
    } catch (error) {
        console.error('Error fetching bookings:', error)
        return []
    }
}

