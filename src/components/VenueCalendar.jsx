import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' 

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
