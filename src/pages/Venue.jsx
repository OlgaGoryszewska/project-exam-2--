import VenueCalendar from '../components/VenueCalendar'
import VenueIntroCard from '../components/VenueIntroCard'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthState } from '../hooks/useAuthState'
import Nav from '../components/Nav'

const url = 'https://v2.api.noroff.dev/holidaze/venues'

function Venue() {
    const [venue, setVenue] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const { id } = useParams()
    const { profile } = useAuthState()

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
        <>
            <Nav profile={profile} />

            <div className="flex flex-col bg-pink-silk max-w-screen-sm m-auto ">
                <VenueIntroCard venue={venue} />
                <VenueCalendar venueId={venue.id} bookedDates={bookedDates} />
            </div>
        </>
    )
}

export default Venue
