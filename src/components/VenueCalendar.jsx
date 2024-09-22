//A user may view a calendar with available dates for a Venue
import { useState } from 'react'
import Calendar from 'react-calendar'
import { createBooking } from '../services/bookingService'
import 'react-calendar/dist/Calendar.css'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import propTypes from 'prop-types'

const VenueCalendar = ({ venueId }) => {
    const [value, onChange] = useState([new Date(), new Date()])
    const [guests, setGuests] = useState(0)

    const handleDateChange = (date) => {
        onChange(date)
    }
    const handleOnSubmit = (event) => {
        event.preventDefault()

        const accessToken = loadLocalStorage('token')
        const bookingData = {
            dateFrom: value[0].toISOString(),
            dateTo: value[1].toISOString(),
            guests: guests,
            venueId: venueId,
        }

        createBooking(bookingData, accessToken)
    }

    return (
        <form
            onSubmit={handleOnSubmit}
            className=" flex flex-col card p-4  items-center"
        >
            <h2>Available dates</h2>
            <Calendar
                returnValue="start"
                selectRange={true}
                onChange={handleDateChange}
                value={value}
            />
            <p>Selected Dates:</p>
            <p>
                {Array.isArray(value)
                    ? `${value[0]?.toDateString()} - ${value[1]?.toDateString()}`
                    : value.toDateString()}
            </p>
            <button className="button-blue mt-4 w-full">Book Venue</button>
            <input
                type="number"
                name="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            />
        </form>
    )
}

VenueCalendar.propTypes = {
    venueId: propTypes.string.isRequired,
}

export default VenueCalendar
