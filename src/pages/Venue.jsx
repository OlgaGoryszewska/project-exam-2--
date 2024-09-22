import VenueCalendar from '../components/VenueCalendar'
import VenueIntroCard from '../components/VenueIntroCard'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const url = 'https://v2.api.noroff.dev/holidaze/venues'

/* 
- get booked dates from the api ✅

- save the booked dates in a variable, as an array of dates

- disable booked dates in the calendar


api returns:

[
{
    dateFrom: "2022-10-01T00:00:00.000Z",
    dateTo: "2022-10-02T00:00:00.000Z",
},
{
    dateFrom: "2022-10-01T00:00:00.000Z",
    dateTo: "2022-10-02T00:00:00.000Z",
},
]

const bookedDates = [
new Date('2022-10-01'),
new Date('2022-10-02'),
new Date('2022-10-03'),
new Date('2022-10-04'),
]

function isBetweenDates(date, startDate, endDate) {
    return (
        date.getTime() >= startDate.getTime() &&
        date.getTime() <= endDate.getTime()
    )
}

tileDisabled 	Pass a function to determine if a certain day should be displayed as disabled. 	n/a 	({ activeStartDate, date, view }) => date.getDay() === 0
*/

function Venue() {
    const [venue, setVenue] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const { id } = useParams()

    useEffect(() => {
        async function fetchVenueById() {
            try {
                const response = await fetch(`${url}/${id}?_bookings=true`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()

                setVenue(() => data.data)

                setBookedDates(() => {
                    return data.data.bookings.map((booking) => {
                        return {
                            dateFrom: new Date(booking.dateFrom),
                            dateTo: new Date(booking.dateTo),
                        }
                    })
                })

                document.title = `${data.data.name}`
            } catch (error) {
                console.error('Error fetching venue data:', error)
            }
        }

        if (id) {
            fetchVenueById()
        }
    }, [id])

    if (!venue) {
        return <p>Venue not available to be viewed</p>
    }

    return (
        <div className="flex flex-col bg-pink-silk max-w-screen-sm m-auto ">
            <VenueIntroCard venue={venue} />
            <VenueCalendar venueId={venue.id} bookedDates={bookedDates} />
        </div>
    )
}

export default Venue
