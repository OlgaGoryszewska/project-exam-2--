//A user may view a calendar with available dates for a Venue

import { API_BASE_URL } from '../constants'

import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export const fetchBookings = async (id) => {
    console.log('fetchBookings',id)
    try {
        const response = await fetch(
            `${API_BASE_URL}/holidaze/venues/${id}"?_owner=true&_bookings=true"`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Noroff-API-Key': API_KEY,
                },
            }
        )

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const data = await response.json()
        const bookedDates = data.data.map((booking) => booking.date)
        return bookedDates
    } catch (error) {
        console.error('Error fetching bookings:', error)
        return []
    }
}

function VenueCalendar() {
    const [date, setDate] = useState(new Date())

    return (
        <div className="card p-4">
            <h2>Available dates</h2>
            <Calendar onChange={setDate} value={date} />
            <p>Selected Date: {date.toDateString()}</p>
        </div>
    )
}

export default VenueCalendar
