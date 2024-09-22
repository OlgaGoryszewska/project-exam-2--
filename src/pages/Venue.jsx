import VenueCalendar from '../components/VenueCalendar'
import VenueIntroCard from '../components/VenueIntroCard'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const url = 'https://v2.api.noroff.dev/holidaze/venues'

function Venue() {
    const [venue, setVenue] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        async function fetchVenueById() {
            try {
                const response = await fetch(`${url}/${id}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()

                setVenue(() => data.data)
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
            <VenueCalendar venueId={venue.id} />
        </div>
    )
}

export default Venue


