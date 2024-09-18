import { useState } from 'react'
import { registerVenue } from '../services/registerVenue'

//Icons
import BakeryDiningIcon from '@mui/icons-material/BakeryDining'
import WifiIcon from '@mui/icons-material/Wifi'
import PetsIcon from '@mui/icons-material/Pets'
import LocalParkingIcon from '@mui/icons-material/LocalParking'

const RegistrationVenueForm = () => {
    const [formVenueData, setFormVenueData] = useState({
        name: '',
        description: '',
        media: [
            {
                url: '',
                alt: '',
            },
        ],
        price: 0,
        maxGuests: 0,
        rating: 0,
        meta: {
            wifi: true,
            parking: true,
            breakfast: true,
            pets: true,
        },
        location: {
            address: '',
            city: '',
            zip: '',
            country: '',
            continent: '',
            lat: 0,
            lng: 0,
        },
    })
    const [error, setError] = useState('')

    const handleInputChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        setFormVenueData({
            ...formVenueData,
            [inputName]: inputValue,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const newVenue = {
                name: formVenueData.name,
                description: formVenueData.description,
                media: formVenueData.media,
                price: formVenueData.price,
                maxGuests: formVenueData.maxGuests,
                rating: formVenueData.rating,
                meta: formVenueData.meta,
                location: formVenueData.location,
            }
            await registerVenue(newVenue)
            alert('Venue registered successfully')
        } catch (error) {
            setError('Error registering venue: ' + error.message)
        }
    }

    return (
        <form className="card flex flex-col p-4" onSubmit={handleSubmit}>
            <label>Venue Name</label>
            <input
                className="text-field"
                type="text"
                name="name"
                value={formVenueData.name}
                onChange={handleInputChange}
            />
            <label>Description</label>
            <input
                className="text-field"
                type="text"
                name="description"
                value={formVenueData.description}
                onChange={handleInputChange}
            />
            <label>Image of the Venue/link </label>
            <input
                className="text-field"
                type="text"
                name="media"
                value={formVenueData.media.url}
                onChange={handleInputChange}
            />
            <label>Price</label>
            <input
                className="text-field"
                type="number"
                name="price"
                value={formVenueData.price}
                onChange={handleInputChange}
            />
            <label>Max Guests</label>
            <input
                className="text-field"
                type="number"
                name="maxGuests"
                value={formVenueData.maxGuests}
                onChange={handleInputChange}
            />
            <label>Rating</label>
            <input
                className="text-field"
                type="number"
                name="rating"
                value={formVenueData.rating}
                onChange={handleInputChange}
            />
            <div className="card-home-page">
                <BakeryDiningIcon />
                <p> Do you provide a breakfast?
                </p>
            </div>
            <div className="card-home-page">
                <WifiIcon />
                <p> Do you provide a wi-fi?
                </p>
            </div>
            <div className="card-home-page">
                <PetsIcon />
                <p> Do you accept pets??
                </p>
            </div>
            <div className="card-home-page">
                <LocalParkingIcon/>
                <p> Do you provide a parking?
                </p>
            </div>
            <button type="submit">Register Venue</button>
            {error && <p>{error}</p>}
        </form>
    )
}
export default RegistrationVenueForm
