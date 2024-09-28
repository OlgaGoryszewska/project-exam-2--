import GetVenueList from '../services/VenueList'
import heroImg from '../assets/img/heroImg.png'
import SearchVenue from '../components/SearchVenue'
import Nav from '../components/Nav'
import { useAuthState } from '../hooks/useAuthState'

function Home() {
    const { profile } = useAuthState()
    return (
        <>
            <Nav profile={profile} />
            <div className="flex flex-col bg-white">
                <img
                    className="max-h-800  object-cover "
                    src={heroImg}
                    alt="home"
                />
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
