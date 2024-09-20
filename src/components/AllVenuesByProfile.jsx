import { fetchAllVenuesByProfile } from '../services/fetchAllVenuesByProfile'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'

//icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

export function AllVenuesByProfile() {
    const [bookings, setBookings] = useState(null)

    useEffect(() => {
        const profileName = loadLocalStorage('profile').name
        const accessToken = loadLocalStorage('token')

        fetchAllVenuesByProfile(profileName, accessToken)
            .then((data) => {
                setBookings(data)
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error)
            })
    }, [])

    return (
        <div className="card flex flex-row py-4 align-center hover:border border-rav-mango">
            <EventAvailableIcon
                fontSize="medium"
                className="text-base font-medium mx-2  "
            />
            <p className="text-base font-medium mx-2">Venues you manage</p>
            {bookings ? (
                <div>
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking._id}>
                                <p>{booking.dateFrom}</p>
                                <p>{booking.dateTo}</p>
                                <p>{booking.guest}</p>
                                <p>{booking.created}</p>
                                <p>{booking.updated}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
