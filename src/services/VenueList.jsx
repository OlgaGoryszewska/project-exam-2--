import { useState, useEffect } from 'react'
import Venue from '../assets/img/venuePng.png'
import StarRating from '../components/RatingStars'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

//Icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import WifiIcon from '@mui/icons-material/Wifi'
import BakeryDiningIcon from '@mui/icons-material/BakeryDining'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

gsap.registerPlugin(ScrollTrigger)

const url = 'https://v2.api.noroff.dev/holidaze/venues'

function GetVenueList() {
    const [venueList, setVenueList] = useState([])

    useEffect(() => {
        async function fetchVenueList() {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setVenueList(data.data)
            } catch (error) {
                console.error('Error fetching venue data:', error)
            }
        }
        fetchVenueList()
    }, [])

    useEffect(() => {
        if (venueList.length > 0) {
            gsap.utils.toArray('.venue-item').forEach((item, index) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    delay: index * 0.1,
                })
            })
        }
    }, [venueList])

    return (
        <div className="hero-card">
            {venueList.length > 0 ? (
                venueList.map((venue) => (
                    <div key={venue.id} className="venue-item">
                        <h2>{venue.name}</h2>
                        {venue.media && venue.media.length > 0 ? (
                            venue.media.map((mediaItem, index) => (
                                <img
                                    key={index}
                                    src={mediaItem.url}
                                    alt={mediaItem.alt || 'Venue Image'}
                                    className="venue-image "
                                />
                            ))
                        ) : (
                            <img
                                src={Venue}
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
                <p>Loading venues...</p>
            )}
        </div>
    )
}

export default GetVenueList
