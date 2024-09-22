import { useState } from 'react'
import { updateVenue } from '../services/updateVenue'
import { loadLocalStorage } from '../storage/loadLocalStorage'


export const UpdateVenueForm = (id) => {
    const [venueState, setVenueState] = useState({
        name: '',
        description: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setVenueState((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const accessToken = loadLocalStorage('token')
        updateVenue(id, accessToken).then((data) => {
            console.log('data', data)
        }   ).catch((error) => {
            console.error('Error updating venue:', error)
        })
    
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

                    <button
                        onClick={handleFormSubmit}
                        type="submit"
                        className="btn-primary"
                    >
                        Update Venue
                    </button>
                </div>
            </form>
        </div>
    )
}
