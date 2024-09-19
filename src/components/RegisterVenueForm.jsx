import { useState } from 'react'
import { API_BASE_URL } from '../constants'
import { API_KEY } from '../constants'
import { loadLocalStorage } from '../storage/loadLocalStorage'

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
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleInputChange = (event) => {
        const inputName = event.target.name
        let inputValue = event.target.value
        if (['price', 'maxGuests', 'rating'].includes(inputName)) {
            inputValue = Number(inputValue)
        }
        setFormVenueData({
            ...formVenueData,
            [inputName]: inputValue,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const mediaArray = Array.isArray(formVenueData.media)
            ? formVenueData.media 
            : formVenueData.media.trim() !== ''
              ? [{ url: formVenueData.media, alt: 'default alt' }] 
              : [] 

        const accessToken = loadLocalStorage('token')

        const newVenue = {
            name: formVenueData.name,
            description: formVenueData.description,
            media: mediaArray,
            price: formVenueData.price,
            maxGuests: formVenueData.maxGuests,
            rating: formVenueData.rating,
            meta: formVenueData.meta,
            location: formVenueData.location,
        }
        try {
            const response = await fetch(`${API_BASE_URL}/holidaze/venues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Noroff-API-Key': API_KEY,
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newVenue),
            })
            if (response.ok) {
                await response(newVenue)
                setSuccess(' Venue registered successfully!')
            }
            const errorData = await response.json()
            setError(errorData.error || 'Failed to create the venue')
        } catch (err) {
            setError('An error occurred while creating the venue')
            console.error(err)
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
            <input
                className="text-field"
                type="text"
                name="media"
                value={formVenueData.media.alt}
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
                <p> Do you provide a breakfast?</p>
            </div>
            <div className="card-home-page">
                <WifiIcon />
                <p> Do you provide a wi-fi?</p>
            </div>
            <div className="card-home-page">
                <PetsIcon />
                <p> Do you accept pets??</p>
            </div>
            <div className="card-home-page">
                <LocalParkingIcon />
                <p> Do you provide a parking?</p>
            </div>
            <button type="submit">Register Venue</button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </form>
    )
}
export default RegistrationVenueForm
