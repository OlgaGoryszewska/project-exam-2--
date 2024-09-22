import { fetchAllVenuesByProfile } from '../services/fetchAllVenuesByProfile'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import StarRating from './RatingStars'
import { deleteVenue } from '../services/deleteVenue'
import { UpdateVenueForm } from './UpdateVenueForm'

//icons
import DeckIcon from '@mui/icons-material/Deck'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export function AllVenuesByProfile() {
    const [venues, setVenues] = useState(null)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    useEffect(() => {
        const profileName = loadLocalStorage('profile').name
        const accessToken = loadLocalStorage('token')

        fetchAllVenuesByProfile(profileName, accessToken)
            .then((data) => {
                console.log('data', data)
                setVenues(data)
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error)
            })
    }, [])

    const handleDelete = (id) => {
        const accessToken = loadLocalStorage('token')

        deleteVenue(id, accessToken)
            .then(() => {
                setVenues((prevVenues) =>
                    prevVenues.filter((venue) => venue.id !== id)
                )
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
            <div className="card">
                {venues &&
                    venues.map((venue) => (
                        <div key={venue.id}>
                            {venue.media && venue.media.length > 0 ? (
                                venue.media.map((mediaItem, index) => (
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
                            <h2 className="mx-4">{venue.name}</h2>
                            <div className="flex flex-row justify-between py-3 border-y border-pink-silk border-dashed m-4">
                                <div>
                                    <StarRating rating={venue.rating} />
                                </div>

                                <p>{venue.price} $/Per Night</p>
                            </div>
                            <div className="flex flex-row justify-between px-4 pb-4">
                                <button
                                    onClick={() => {
                                        setShowUpdateForm(!showUpdateForm)
                                    }}
                                    className="button-blue w-28"
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() => handleDelete(venue.id)}
                                    className="button-blue w-28"
                                >
                                    Delate
                                </button>
                            </div>
                            <div className="m-4">
                                {venue.bookings && venue.bookings.length > 0 ? (
                                    (console.log(venue.bookings),
                                    (
                                        <div>
                                            <h3>Bookings:</h3>
                                            {venue.bookings.map(
                                                (booking, index) => (
                                                    <div
                                                        key={index}
                                                        className="border p-2 mb-2"
                                                    >
                                                        <p>
                                                            <strong>
                                                                From:
                                                            </strong>{' '}
                                                            {booking.dateFrom} -{' '}
                                                            <strong>To:</strong>{' '}
                                                            {booking.dateTo}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Guests:
                                                            </strong>{' '}
                                                            {booking.guests}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Customer:
                                                            </strong>{' '}
                                                            {
                                                                booking.customer
                                                                    .name
                                                            }{' '}
                                                            (
                                                            {
                                                                booking.customer
                                                                    .email
                                                            }
                                                            )
                                                        </p>
                                                        {booking.customer
                                                            .avatar && (
                                                            <img
                                                                src={
                                                                    booking
                                                                        .customer
                                                                        .avatar
                                                                        .url
                                                                }
                                                                alt={
                                                                    booking
                                                                        .customer
                                                                        .avatar
                                                                        .alt ||
                                                                    'Customer avatar'
                                                                }
                                                                className="avatar-image"
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-4 border-t border-dashed border-pink-silk ">
                                        <h4>Bookings:</h4>
                                        <p className="py-4 ">
                                            No bookings yet!
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div>{showUpdateForm && <UpdateVenueForm />}</div>
                        </div>
                    ))}
            </div>
        </>
    )
}
