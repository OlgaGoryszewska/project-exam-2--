import { useState } from 'react'
import Calendar from 'react-calendar'
import { createBooking } from '../services/bookingService'
import 'react-calendar/dist/Calendar.css'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import propTypes from 'prop-types'
import { CustomAlert } from './CustomAlert'
import { useNavigate } from 'react-router-dom'

const VenueCalendar = ({ venueId, bookedDates }) => {
    const [value, onChange] = useState([new Date(), new Date()])
    const [guests, setGuests] = useState(0)
    const [alertMessage, setAlertMessage] = useState({
        message: '',
        show: false,
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

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
            .then(() => {
                setAlertMessage({
                    message:
                        'Booking successful! Go to profile to see your bookings.',
                    show: true,
                })
            })
            .catch((error) => {
                setError('Error booking: ' + error.message)
            })
    }
    const handleAlertClose = () => {
        setAlertMessage({ ...alertMessage, show: false })
        navigate('/profile')
    }

    return (
        <>
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
                    tileDisabled={({ date }) =>
                        bookedDates.some(({ dateFrom, dateTo }) =>
                            isBetweenDates(date, dateFrom, dateTo)
                        )
                    }
                />
                <div className="flex flex-row p-2">
                    <div className="w-6 h-6 border bg-disable"></div>
                    <p className="text-light-gray pl-2">
                        - dates not available
                    </p>
                </div>
                <h4>Selected Dates:</h4>
                <p className="pb-4">
                    {Array.isArray(value)
                        ? `${value[0]?.toDateString()} - ${value[1]?.toDateString()}`
                        : value.toDateString()}
                </p>
                <h4>Number og guests</h4>
                <input
                    className="text-field"
                    type="number"
                    name="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                />
                <button className="button-blue mt-4 w-full">Book Venue</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            <div>
                {alertMessage.show && (
                    <CustomAlert
                        message={alertMessage.message}
                        onClose={handleAlertClose}
                    />
                )}
            </div>
        </>
    )
}

function isBetweenDates(date, startDate, endDate) {
    return (
        date.getTime() >= startDate.getTime() &&
        date.getTime() <= endDate.getTime()
    )
}

VenueCalendar.propTypes = {
    venueId: propTypes.string.isRequired,
    bookedDates: propTypes.array.isRequired,
}

export default VenueCalendar
