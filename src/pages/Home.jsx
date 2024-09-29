import GetVenueList from '../services/VenueList'
import SearchVenue from '../components/SearchVenue'
import Nav from '../components/Nav'
import { useAuthState } from '../hooks/useAuthState'
import { HeroImg } from '../components/animated/HeroImg'

function Home() {
    const { profile } = useAuthState()

    return (
        <>
            <Nav profile={profile} />
            <div className="flex flex-col bg-white">
                <HeroImg />

                <div className="flex flex-col max-w-4xl mx-auto ">
                    <h1 className="text-center p-4 ">
                        Discover the best retreats of Sri Lanka
                    </h1>
                    <SearchVenue />

                    <h3>All Venues...</h3>
                    <GetVenueList />
                </div>
            </div>
        </>
    )
}

export default Home
