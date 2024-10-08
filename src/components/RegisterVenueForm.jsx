import { useState } from 'react'
import { API_BASE_URL } from '../constants'
import { API_KEY } from '../constants'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import { CustomAlert } from './CustomAlert'


//Icons
import BakeryDiningIcon from '@mui/icons-material/BakeryDining'
import WifiIcon from '@mui/icons-material/Wifi'
import PetsIcon from '@mui/icons-material/Pets'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import AddHomeIcon from '@mui/icons-material/AddHome'
import AddIcon from '@mui/icons-material/Add'

const RegisterVenueForm = () => {
    const [showRegisterVenueForm, setShowRegisterVenueForm] = useState(false)
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
    const [alertMessage, setAlertMessage] = useState({
        message: '',
        show: false,
    })
    const [error, setError] = useState(null)

    const handleMetaChange = (event) => {
        const { name, value } = event.target
        const boleanValue = value === 'true'
        setFormVenueData((prevState) => ({
            ...prevState,
            meta: { ...prevState.meta, [name]: boleanValue },
        }))
    }

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
                setAlertMessage({
                    message: ' Venue registered successfully!',
                    show: true,
                })
            }
        } catch (err) {
            setError('An error occurred while creating the venue')
            console.error(err)
        }
    }

    const handleAlertClose = () => {
        setAlertMessage({ ...alertMessage, show: false })
    }

    return (
        <>
            <div
                className="card  hover:border border-rav-mango flex justify-between"
                onClick={() => {
                    setShowRegisterVenueForm(!showRegisterVenueForm)
                }}
            >
                <div className="card-home-page m-4 mb-0 ">
                    <AddHomeIcon />
                    <p className="text-base font-medium mx-2 mb-4  ">
                        Add Venue
                    </p>
                </div>
                <AddIcon className="m-4 hover:text-rav-mango  " />
            </div>
            {showRegisterVenueForm && (
                <div className="m-4">
                    <form
                        className=" card-registration "
                        onSubmit={handleSubmit}
                    >
                        <h2 className="pb-4">Register new Venue</h2>
                        <label>Venue Name</label>
                        <input
                            className="text-field"
                            type="text"
                            name="name"
                            value={formVenueData.name}
                            onChange={handleInputChange}
                        />
                        <label>Description</label>
                        <textarea
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
                            className="text-field hidden"
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
                        <label>Rating/ max 5</label>
                        <input
                            className="text-field"
                            type="number"
                            name="rating"
                            value={formVenueData.rating}
                            onChange={handleInputChange}
                        />
                        <div className="card-home-page pt-4 flex flex-row justify-between">
                            <div className="flex flex-row ">
                                <BakeryDiningIcon />
                                <p className="pl-2">
                                    Have a breakfast?
                                </p>
                            </div>

                            <div>
                                <label className="mt-0 px-2">Yes</label>
                                <input
                                    type="radio"
                                    value="true"
                                    name="breakfast"
                                    onChange={handleMetaChange}
                                    checked={
                                        formVenueData.meta.breakfast === true
                                    }
                                />
                                <label className="mt-0 px-2">No</label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="breakfast"
                                    onChange={handleMetaChange}
                                    checked={
                                        formVenueData.meta.breakfast === false
                                    }
                                />
                            </div>
                        </div>
                        <div className="card-home-page flex flex-row justify-between">
                            <div className="card-home-page pt-4">
                                <WifiIcon />
                                <p className="pl-2"> Provide a wi-fi?</p>
                            </div>
                            <div className="mt-4">
                                <label className="mt-0 px-2">Yes</label>
                                <input
                                    type="radio"
                                    value="true"
                                    name="wifi"
                                    onChange={handleMetaChange}
                                    checked={formVenueData.meta.wifi === true}
                                />
                                <label className="mt-0 px-2">No</label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="wifi"
                                    onChange={handleMetaChange}
                                    checked={formVenueData.meta.wifi === false}
                                />
                            </div>
                        </div>
                        <div className="card-home-page flex flex-row justify-between">
                            <div className="card-home-page pt-4">
                                <PetsIcon />
                                <p className="pl-2"> Accept pets??</p>
                            </div>
                            <div className="mt-4">
                                <label className="mt-0 px-2">Yes</label>
                                <input
                                    type="radio"
                                    value="true"
                                    name="pets"
                                    onChange={handleMetaChange}
                                    checked={formVenueData.meta.pets === true}
                                />
                                <label className="mt-0 px-2">No</label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="pets"
                                    onChange={handleMetaChange}
                                    checked={formVenueData.meta.pets === false}
                                />
                            </div>
                        </div>
                        <div className="card-home-page flex flex-row justify-between">
                            <div className="card-home-page pt-4">
                                <LocalParkingIcon />
                                <p className="pl-2 pb-4">
                                    Provide a parking?
                                </p>
                            </div>
                            <div className="mt-4">
                                <label className="mt-0 px-2">Yes</label>
                                <input
                                    type="radio"
                                    value="true"
                                    name="parking"
                                    onChange={handleMetaChange}
                                    checked={
                                        formVenueData.meta.parking === true
                                    }
                                />
                                <label className="mt-0 px-2">No</label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="parking"
                                    onChange={handleMetaChange}
                                    checked={
                                        formVenueData.meta.parking === false
                                    }
                                />
                            </div>
                        </div>

                        <button className="button-blue" type="submit">
                            Register Venue
                        </button>
                        {alertMessage.show && (
                            <CustomAlert
                                message={alertMessage.message}
                                onClose={handleAlertClose}
                            />
                        )}
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                </div>
            )}
        </>
    )
}
export default RegisterVenueForm
