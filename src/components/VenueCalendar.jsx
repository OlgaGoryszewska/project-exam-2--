//A user may view a calendar with available dates for a Venue
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { createBooking } from '../services/bookingService'
import 'react-calendar/dist/Calendar.css'

const VenueCalendar = () => {
    const [value, onChange] = useState(new Date())

    const handleDateChange = (date) => {
        onChange(date)
    }

    return (
        <div className=" flex flex-col card p-4  items-center">
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
                    ? `${value[0].toDateString()} - ${value[1].toDateString()}`
                    : value.toDateString()}
            </p>
            <button className="button-blue mt-4 w-full">Book Venue</button>
        </div>
    )
}

export default VenueCalendar
