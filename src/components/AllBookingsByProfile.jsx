import { useEffect, useState } from 'react'
import { fetchAllBookingsByProfile } from '../services/fetchAllBookingsByProfile'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import { formatDate } from '../utils/formatDate'

// Icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'

export function AllBookingsByProfile() {
    const [bookings, setBookings] = useState([])
    const [showUpComingBookings, setShowUpComingBookings] = useState(false)
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
        <>
            <div
                onClick={() => setShowUpComingBookings(!showUpComingBookings)}
                className="  card hover:border border-rav-mango pl-4 flex justify-between "
            >
                <div className="flex items-center">
                    <EventAvailableIcon />
                    <p className="text-base font-medium mx-2">
                        Upcoming bookings
                    </p>
                </div>
                <KeyboardArrowDownIcon
                    className={`m-4 hover:text-rav-mango transform transition-transform duration-200 ${showUpComingBookings ? 'rotate-180' : ''}`}
                />
            </div>
            {showUpComingBookings && (
                <div className="card m-4">
                    {loading ? (
                        <p>Loading bookings...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : bookings && bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div
                                className=" flex pl-4 text-sm "
                                key={booking.id}
                            >
                                <p className="text-dark-gray pr-4 pt-2">
                                    Check-in: {formatDate(booking.dateFrom)}
                                </p>
                                <p className="text-dark-gray pr-4 pt-2">
                                    Check-out: {formatDate(booking.dateTo)}
                                </p>
                                <p className="text-dark-gray pr-4 py-2">
                                    Guests: {booking.guests}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center ">
                            <ThumbDownOffAltIcon
                                fontSize="large"
                                className="mt-4"
                            />
                            <p className="p-4 text-center">
                                It seems like you have not booked any venues yet
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
