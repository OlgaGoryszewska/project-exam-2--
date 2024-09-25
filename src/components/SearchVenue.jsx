import { useEffect, useState } from 'react'
import VenuePng from '../assets/img/venuePng.png'
import StarRating from './RatingStars'
import { Link } from 'react-router-dom'
import { findVenueByName } from '../services/findVenueByName'

//Icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import WifiIcon from '@mui/icons-material/Wifi'
import BakeryDiningIcon from '@mui/icons-material/BakeryDining'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

function SearchVenue() {
    const [query, setQuery] = useState('')
    const [venues, setVenues] = useState([])

    useEffect(() => {
        findVenueByName(query)
            .then((venuesReturnedByAPI) => {
                setVenues(venuesReturnedByAPI)
            })
            .catch((error) => {
                console.error('Error fetching Venue:', error)
            })
    }, [query])

    return (
        <div className="container mx-auto p-4 ">
            <div>
                <input
                    type="text"
                    placeholder="Search venues by name or description"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 border border-deep-blue rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rav-mango focus:border-transparent"
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="absolute right-2 top-2 text-gray-500 hover:text-rav-mango focus:outline-none"
                    >
                        Clear
                    </button>
                )}
            </div>
            <div className="mt-4">
                {venues.length > 0 ? (
                    venues.map((venue) => (
                        <div key={venue.id} className="venue-item">
                            <h2>{venue.name}</h2>
                            {venue.media && venue.media.length > 0 ? (
                                venue.media.map((mediaItem, index) => (
                                    <img
                                        key={index}
                                        src={mediaItem.url}
                                        alt={mediaItem.alt || 'Venue Image'}
                                        className="venue-image"
                                    />
                                ))
                            ) : (
                                <img
                                    src={VenuePng}
                                    alt="missing img"
                                    className="venue-image"
                                />
                            )}
                            <div className="data-container border-dashed border-b border-pink-silk">
                                <div className="card-home-page">
                                    <PeopleAltIcon className="venue-icon" />
                                    <p>{venue.maxGuests} Guests </p>
                                </div>
                                <div className="card-home-page">
                                    <WifiIcon className="venue-icon" />
                                    <p>
                                        {venue.meta.wifi
                                            ? 'Available'
                                            : 'Not Available'}
                                    </p>
                                </div>
                                <div className="card-home-page">
                                    <BakeryDiningIcon className="venue-icon" />
                                    <p>
                                        {venue.meta.breakfast
                                            ? 'Breakfast'
                                            : 'Not Available'}
                                    </p>
                                </div>
                                <div className="card-home-page">
                                    <PlaceOutlinedIcon className="venue-icon" />
                                    <p>{venue.city ? venue.city : 'Colombo'}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between py-3 border-b border-pink-silk border-dashed mb-2">
                                <div>
                                    <StarRating rating={venue.rating} />
                                </div>

                                <p>{venue.price} $</p>
                                <button type="button" className="button">
                                    <Link to={`/Venue/${venue.id}`}>View</Link>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results found...</p>
                )}
            </div>
        </div>
    )
}

export default SearchVenue
