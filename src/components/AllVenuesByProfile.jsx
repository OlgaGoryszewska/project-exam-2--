import { fetchAllVenuesByProfile } from '../services/fetchAllVenuesByProfile'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'

//icons
import DeckIcon from '@mui/icons-material/Deck'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

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
        <>
            <div className="card  hover:border border-rav-mango flex justify-between">
                <div className="card-home-page m-4 mb-0 ">
                    <DeckIcon />
                    <p className="text-base font-medium mx-2 mb-4  ">
                        Venues you manage
                    </p>
                </div>
                <KeyboardArrowDownIcon className="m-4 hover:text-rav-mango  " />
            </div>
            <div className="card">
                {bookings &&
                    bookings.map((booking) => (
                        <div key={booking.id}>
                            <p>{booking.name}</p>
                            <p>{booking.price}</p>
                            {booking.media && booking.media.length > 0 ? (
                                booking.media.map((mediaItem, index) => (
                                    <img
                                        key={index}
                                        src={mediaItem.url}
                                        alt={mediaItem.alt || 'Venue image'}
                                    />
                                ))
                            ) : (
                                <p>No images available</p>
                            )}
                        </div>
                    ))}
            </div>
        </>
    )
}
