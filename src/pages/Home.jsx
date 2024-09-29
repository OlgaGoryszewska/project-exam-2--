import GetVenueList from '../services/VenueList'
import SearchVenue from '../components/SearchVenue'
import Nav from '../components/Nav'
import { useAuthState } from '../hooks/useAuthState'
import { HeroImg } from '../components/animated/HeroImg'
import { HeroText } from '../components/animated/HeroText'

function Home() {
    const { profile } = useAuthState()

    return (
        <>
            <Nav profile={profile} />
            <div className="flex flex-col bg-white">
                <HeroImg />

                <div className="flex flex-col max-w-4xl mx-auto ">
                    <HeroText />
                    <SearchVenue />
                    <GetVenueList />
                </div>
            </div>
        </>
    )
}

export default Home
