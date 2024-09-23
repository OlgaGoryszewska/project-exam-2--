import PropTypes from 'prop-types'
import VenuePng from '../assets/img/venuePng.png'
import StarRating from './RatingStars'
import {formatDate} from '../utils/formatDate'


//Icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import WifiIcon from '@mui/icons-material/Wifi'
import BakeryDiningIcon from '@mui/icons-material/BakeryDining'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import PetsIcon from '@mui/icons-material/Pets'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import PublicIcon from '@mui/icons-material/Public'

const VenueIntroCard = ({ venue }) => {
    if (!venue) {
        return <p>Venue not available to be viewed</p>
    }

    return (
        <div>
            <div className="flex flex justify-between p-4">
                <p className="text-light-gray italic">
                    Created: {formatDate(venue.created)}
                </p>
                <p className="text-light-gray italic">
                    Updated: {formatDate(venue.updated)}
                </p>
            </div>
            <div className="card">
                {venue.media && venue.media.length > 0 ? (
                    <>
                        {venue.media.map((mediaItem, index) => (
                            <div key={index}>
                                <img
                                    src={mediaItem.url}
                                    alt={mediaItem.alt || 'Venue Image'}
                                    className="venue-image "
                                />
                                <h2 className="mx-4">{venue.name}</h2>
                                <div className="data-container ">
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
                                        <PetsIcon className="venue-icon" />
                                        <p>
                                            {venue.meta.pets
                                                ? 'Pets Aloud'
                                                : 'Pets Not Aloud'}
                                        </p>
                                    </div>
                                    <div className="card-home-page">
                                        <LocalParkingIcon className="venue-icon" />
                                        <p>
                                            {venue.meta.parking
                                                ? 'Parking'
                                                : 'No Parking'}
                                        </p>
                                    </div>
                                    <div className="card-home-page">
                                        <PlaceOutlinedIcon className="venue-icon" />
                                        <p>
                                            {venue.city
                                                ? venue.city
                                                : 'Colombo'}
                                        </p>
                                    </div>
                                    <div className="card-home-page">
                                        <PublicIcon className="venue-icon" />
                                        <p>
                                            {venue.country
                                                ? venue.country
                                                : 'Sri Lanka'}
                                        </p>
                                    </div>
                                </div>
                                <p className="mx-4">{venue.description}</p>
                                <div className="flex flex-row justify-between py-3 border-t border-pink-silk border-dashed m-4">
                                    <div>
                                        <StarRating rating={venue.rating} />
                                    </div>

                                    <p>{venue.price} $/Per Night</p>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <div>
                            <img
                                src={VenuePng}
                                alt="missing img"
                                className="venue-image"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

VenueIntroCard.propTypes = {
    venue: PropTypes.object.isRequired,
}

export default VenueIntroCard
