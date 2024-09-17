import { useState } from "react";
import { registerVenue } from "../services/registerVenue";

const RegistrationVenueForm = () => {
    console.log('RegistrationVenueForm')
    const 
    [formVenueData, setFormVenueData] = useState({
        name: "string", // Required
        description: "string", // Required
        media: [
          {
            url: "https://url.com/image.jpg",
            alt: "string"
          }
        ], 
        price: 0, // Required
        maxGuests: 0, // Required
        rating: 0, 
        meta: {
          wifi: true, 
          parking: true, 
          breakfast: true, 
          pets: true 
        },
        location: {
          address: "string", 
          city: "string", 
          zip: "string", 
          country: "string", 
          continent: "string", 
          lat: 0, 
          lng: 0 
        }

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
            location: formVenueData.location
        }
        await registerVenue(newVenue)
        alert('Venue registered successfully')
    } catch (error) {
        setError('Error registering venue: ' + error.message)
    }       
}

return (
    <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input
                type="text"
                name="name"
                value={formVenueData.name}
                onChange={handleInputChange}
            />
        </label>
        <label>
            Description:
            <input
                type="text"
                name="description"
                value={formVenueData.description}
                onChange={handleInputChange}
            />
        </label>
        <label>
            Media:
            <input
                type="text"
                name="media"
                value={formVenueData.media}
                onChange={handleInputChange}
            />
        </label>
        <label>
            Price:
            <input
                type="number"
                name="price"
                value={formVenueData.price}
                onChange={handleInputChange}
            />
        </label>
        <label>
            Max Guests:
            <input
                type="number"
                name="maxGuests"
                value={formVenueData.maxGuests}
                onChange={handleInputChange}
            />
        </label>
        <label>
            Rating:
            <input
                type="number"
                name="rating"
                value={formVenueData.rating}
                onChange={handleInputChange}
            />
        </label>
        <label>
            Meta:
            <input
                type="text"
                name="meta"
                value={formVenueData.meta}
                onChange={handleInputChange}
            />
        </label>
        <label>
            Location:
            <input
                type="text"
                name="location"
                value={formVenueData.location}
                onChange={handleInputChange}
            />
        </label>
        <button type="submit">Register Venue</button>
        {error && <p>{error}</p>}
    </form>
)
}
export default RegistrationVenueForm;