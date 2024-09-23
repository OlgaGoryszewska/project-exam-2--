
import { useEffect, useState } from 'react'
import { fetchAllBookingsByProfile } from '../services/fetchAllBookingsByProfile'
import { loadLocalStorage } from '../storage/loadLocalStorage'

// Icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export function AllBookingsByProfile() {
    const [bookings, setBookings] = useState([]) 
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const profile = loadLocalStorage('profile')
        const profileName = profile.name
        const accessToken = loadLocalStorage('token')

        fetchAllBookingsByProfile(profileName, accessToken)
            .then((data) => {
                if (data) {
                    setBookings(data)
                } else {
                    setError('No data received')
                }
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error)
                setError('Failed to fetch bookings')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    return (
        <div className="card hover:border border-rav-mango flex flex-col">
            <div className="card-home-page m-4 mb-0 flex justify-between items-center">
                <div className="flex items-center">
                    <EventAvailableIcon />
                    <p className="text-base font-medium mx-2 mb-4">
                        Upcoming bookings
                    </p>
                </div>
                <KeyboardArrowDownIcon className="m-4 hover:text-rav-mango" />
            </div>
            <div className="bookings-list m-4">
                {loading ? (
                    <p>Loading bookings...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : bookings && bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div key={booking.id} className="booking-item p-4 border-b">
                            <h3 className="font-semibold">{booking.title}</h3>
                            <p>Check-in: {booking.checkIn}</p>
                            <p>Check-out: {booking.checkOut}</p>
                            <p>Guests: {booking.guests}</p>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    )
    
}
