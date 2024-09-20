import { fetchAllBookingsByProfile } from '../services/fetchAllBookingsByProfile'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'

//icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export function AllBookingsByProfile() {
    const [bookings, setBookings] = useState(null)

    useEffect(() => {
        const profileName = loadLocalStorage('profile').name
        const accessToken = loadLocalStorage('token')

        fetchAllBookingsByProfile(profileName, accessToken)
            .then((data) => {
                setBookings(data)
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error)
            })
    }, [])

    return (
        <div className="card  hover:border border-rav-mango flex justify-between">
        <div className="card-home-page m-4 mb-0 ">
            <EventAvailableIcon />
            <p className="text-base font-medium mx-2 mb-4  ">
                Upcoming bookings
            </p>
        </div>
        < KeyboardArrowDownIcon className="m-4 hover:text-rav-mango  " />
    </div>

    )
}
