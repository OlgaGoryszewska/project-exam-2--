import { fetchAllVenuesByProfile } from '../services/fetchAllVenuesByProfile'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import StarRating  from './RatingStars'
import { deleteVenue } from '../services/deleteVenue'
import { updateVenue } from '../services/updateVenue'

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

    const handleDelete = (id) => {
        const accessToken = loadLocalStorage('token')

        deleteVenue(id, accessToken)
            .then(() => {

                setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id))
            })
            .catch((error) => {
                console.error('Error deleting venue:', error)
                
            })
    }


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
            <div className="card"
             >
                {bookings &&
                    bookings.map((booking) => (
                        <div key={booking.id}>
                            {booking.media && booking.media.length > 0 ? (
                                booking.media.map((mediaItem, index) => (
                                    <img
                                        key={index}
                                        src={mediaItem.url}
                                        alt={mediaItem.alt || 'Venue image'}
                                        className="venue-image "
                                    />
                                ))
                            ) : (
                                <p>No images available</p>
                            )}
                            <h2 className="mx-4">{booking.name}</h2>
                            <div className="flex flex-row justify-between py-3 border-y border-pink-silk border-dashed m-4">
                                <div>
                                    <StarRating rating={booking.rating} />
                                </div>

                                <p>{booking.price} $/Per Night</p>
                            </div>
                            <div className='flex flex-row justify-between px-4 pb-4'>
                                <button className='button-blue w-28'>Update</button>
                                <button onClick={() => handleDelete(booking.id)} className='button-blue w-28'>Delate</button>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}
