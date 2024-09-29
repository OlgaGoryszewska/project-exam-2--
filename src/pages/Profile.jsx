import { fetchProfile } from '../services/fetchProfile'
import { useEffect, useState, useRef } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import ChangeAvatar from '../components/ChangeAvatar'
import { AllBookingsByProfile } from '../components/AllBookingsByProfile'
import { AllVenuesByProfile } from '../components/AllVenuesByProfile'
import propTypes from 'prop-types'
import RegisterVenueForm from '../components/RegisterVenueForm'
import { useAuthState } from '../hooks/useAuthState'
import Nav from '../components/Nav'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

//Icons

import CabinIcon from '@mui/icons-material/Cabin'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility'

import EditNoteIcon from '@mui/icons-material/EditNote'

function Profile() {
    const [profile, setProfile] = useState(null)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const { profile: profileAuth } = useAuthState()
    const avatarRef = useRef(null)
    const profileNameRef = useRef(null)

    useEffect(() => {
        const profileName = loadLocalStorage('profile').name
        const accessToken = loadLocalStorage('token')
        const userBookings = {
            bookings: [
                {
                    dateFrom: '',
                    dateTo: '',
                    guests: 0,
                    venue: {
                        name: '',
                    },
                },
            ],
        }

        fetchProfile(profileName, accessToken, userBookings)
            .then((data) => {
                setProfile(data)
            })
            .catch((error) => {
                console.error('Error fetching profile:', error)
            })
    }, [])

    useEffect(() => {
        if (profile && avatarRef.current) {
            gsap.fromTo(
                avatarRef.current,
                { x: '-100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 1.5, ease: 'power3.out' }
            )
        }
    }, [profile])

    useEffect(() => {
        if (profile && profileNameRef.current) {
            gsap.to(profileNameRef.current, {
                duration: 3,
                scrambleText: { text: profile.name },
                chars: 'XO',
                ease: 'power3',
            })
        }
    }, [profile])

    return (
        <>
            <Nav profile={profileAuth} />
            <div className="flex flex-col max-w-4xl mx-auto">
                {profile ? (
                    <div>
                        <img
                            className="rounded-full h-36 w-36 object-cover border border-white border-4 ml-4 mt-20 absolute z-10"
                            src={profile.avatar.url}
                            alt="profile img"
                            ref={avatarRef}
                        />
                        <img
                            className="w-full h-48 object-cover pb-6 relative "
                            src={profile.banner.url}
                            alt="banner for a profile"
                        />

                        <div className="card pt-8 ">
                            <div className="flex flex-row pt-4 justify-between">
                                <h3 ref={profileNameRef}>{profile.name}</h3>

                                <EditNoteIcon
                                    onClick={() => {
                                        setShowUpdateForm(!showUpdateForm)
                                    }}
                                    fontSize="large"
                                    className=" m-4 hover:text-rav-mango  "
                                />
                            </div>
                            <p className="text-base font-medium mx-4  ">
                                {profile.email}
                            </p>
                            <p className="font-light text-base mx-4 ">
                                {profile.bio
                                    ? profile.bio
                                    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel ultricies ligula. Curabitur volutpat odio nec purus interdum, at ullamcorper felis tincidunt. Vivamus '}
                            </p>
                            <div className="card-home-page m-4">
                                <CabinIcon />
                                <p className="text-base font-medium mx-2  ">
                                    Venues:
                                    {profile._count.venues}
                                </p>
                            </div>
                            <div className="card-home-page m-4">
                                <CalendarMonthIcon />
                                <p className="text-base font-medium mx-2  ">
                                    Bookings:
                                    {profile._count.bookings}
                                </p>
                            </div>
                            <div className="card-home-page m-4">
                                <SettingsAccessibilityIcon />
                                <p className="text-base font-medium mx-2 mb-4  ">
                                    Venue Manager:
                                    {profile.venueManager ? ' Yes' : ' No'}
                                </p>
                            </div>
                        </div>
                        <div className="card hover:border border-rav-mango ">
                            {showUpdateForm && <ChangeAvatar />}
                        </div>
                        <AllBookingsByProfile />
                        <AllVenuesByProfile id="allVenues" venues />
                        <RegisterVenueForm />
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </>
    )
}

export default Profile

Profile.propTypes = { userBookings: propTypes.array }
