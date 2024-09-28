import GetVenueList from '../services/VenueList'
import heroImg from '../assets/img/heroImg.png'
import SearchVenue from '../components/SearchVenue'
import Nav from '../components/Nav'
import { useAuthState } from '../hooks/useAuthState'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { useRef } from 'react'

function Home() {
    const { profile } = useAuthState()
    const imageRef = useRef(null)

    useEffect(() => {
        gsap.from(imageRef.current, {
            duration: 1,
            scale: 1,
            opacity: 0,
            ease: 'back.out(1.7)',
            delay: 0.5,
            transformOrigin: 'center',
        })
    }, [])

    return (
        <>
            <Nav profile={profile} />
            <div className="flex flex-col bg-white">
                <img
                    className="max-h-800  object-cover "
                    src={heroImg}
                    alt="home"
                    ref={imageRef}
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
