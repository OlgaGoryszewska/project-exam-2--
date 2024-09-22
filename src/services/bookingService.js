import { API_BASE_URL, API_KEY } from '../constants'

export const createBooking = async (bookingData, accessToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, 
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create booking: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error 
  }
}
