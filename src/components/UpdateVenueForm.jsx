import PropTypes from 'prop-types'
import { useState } from 'react'
import { updateVenue } from '../services/updateVenue'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import { CustomAlert } from './CustomAlert'

export const UpdateVenueForm = ({ id, venue }) => {
    const [venueState, setVenueState] = useState(venue)
    const [alertMessage, setAlertMessage] = useState({
        message: '',
        type: '',
        show: false,
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setVenueState((prevData) => {
            const nameParts = name.split('.')

            if (nameParts.length === 2) {
                const [parentKey, childKey] = nameParts
                return {
                    ...prevData,
                    [parentKey]: [
                        {
                            ...prevData[parentKey][0],
                            [childKey]: value,
                        },
                    ],
                }
            } else if (['price', 'maxGuests', 'rating'].includes(name)) {
                return {
                    ...prevData,
                    [name]: Number(value),
                }
            } else {
                return {
                    ...prevData,
                    [name]: value,
                }
            }
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()

        const accessToken = loadLocalStorage('token')
        const newVenue = {
            name: venueState.name,
            description: venueState.description,
            media: venueState.media,
            price: venueState.price,
            maxGuests: venueState.maxGuests,
            rating: venueState.rating,
            meta: venueState.meta,
            location: venueState.location,
        }

        updateVenue(id, accessToken, venueState, newVenue)
            .then((data) => {
                setAlertMessage({
                    message: 'Venue updated successfully',
                    type: 'success',
                    show: true,
                })
                console.log('Venue updated:', data)
            })
            .catch((error) => {
                console.error('Error updating venue:', error)
            })
    }
    const handleCloseAlert = () => {
        setAlertMessage({ ...alertMessage, show: false })
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit} className="p-4">
                <div className="flex flex-col">
                    <h4 className="text-lg font-medium">Update Venue</h4>

                    <label>Venue Name</label>
                    <input
                        type="text"
                        name="name"
                        value={venueState.name}
                        onChange={handleInputChange}
                        required
                        className="text-field"
                    />

                    <label>Venue Description</label>
                    <textarea
                        name="description"
                        value={venueState.description}
                        onChange={handleInputChange}
                        required
                        className="text-field"
                    />

                    <label>Image URL of the Venue</label>
                    <input
                        className="text-field"
                        type="text"
                        name="media.url"
                        value={venueState.media[0].url}
                        onChange={handleInputChange}
                    />

                    <label>Image Alt Text</label>
                    <input
                        className="text-field"
                        type="text"
                        name="media.alt"
                        value={venueState.media[0].alt}
                        onChange={handleInputChange}
                    />

                    <label>Price</label>
                    <input
                        className="text-field"
                        type="number"
                        name="price"
                        value={venueState.price}
                        onChange={handleInputChange}
                    />

                    <label>Max Guests</label>
                    <input
                        className="text-field"
                        type="number"
                        name="maxGuests"
                        value={venueState.maxGuests}
                        onChange={handleInputChange}
                    />

                    <label>Rating</label>
                    <input
                        className="text-field"
                        type="number"
                        name="rating"
                        value={venueState.rating}
                        onChange={handleInputChange}
                    />

                    <button
                        type="submit"
                        className="button-blue mt-4  place-self-center"
                    >
                        Update Venue
                    </button>
                </div>
                {alertMessage.show && (
                    <CustomAlert
                        message={alertMessage.message}
                        onClose={handleCloseAlert}
                    />
                )}
            </form>
        </div>
    )
}

UpdateVenueForm.propTypes = {
    id: PropTypes.string.isRequired,
    venue: PropTypes.object,
}
