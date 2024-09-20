import { fetchProfile } from '../services/fetchProfile'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'
import ChangeAvatar from '../components/ChangeAvatar'
import { AllBookingsByProfile } from '../components/AllBookingsByProfile'
import { AllVenuesByProfile } from '../components/AllVenuesByProfile'

//Icons

import CabinIcon from '@mui/icons-material/Cabin'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility'
import AddHomeIcon from '@mui/icons-material/AddHome'
import AddIcon from '@mui/icons-material/Add'
import EditNoteIcon from '@mui/icons-material/EditNote'
import DeckIcon from '@mui/icons-material/Deck';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Profile() {
    const [profile, setProfile] = useState(null)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    useEffect(() => {
        const profileName = loadLocalStorage('profile').name
        const accessToken = loadLocalStorage('token')

        fetchProfile(profileName, accessToken)
            .then((data) => {
                setProfile(data)
            })
            .catch((error) => {
                console.error('Error fetching profile:', error)
            })
    }, [])

    return (
        <div>
            {profile ? (
                <div>
                    <img
                        className="rounded-full h-36 w-36 object-cover border border-white border-4 ml-4 mt-20 absolute z-10"
                        src={profile.avatar.url}
                        alt="profile img"
                    />
                    <img
                        className="w-full h-48 object-cover pb-6 relative "
                        src={profile.banner.url}
                        alt="banner for a profile"
                    />

                    <div className="card pt-8 ">
                        <div className="flex flex-row pt-4 justify-between">
                            <h3>{profile.name}</h3>
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
                                {profile._count.venues}
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
                    <AllBookingsByProfile/>
                    <AllVenuesByProfile />
                    <div
                        className="card  hover:border border-rav-mango flex justify-between"
                        onClick={() => {
                            window.location.href = '/AddVenue'
                        }}
                    >
                        <div className="card-home-page m-4 mb-0 ">
                            <AddHomeIcon />
                            <p className="text-base font-medium mx-2 mb-4  ">
                                Add Venue
                            </p>
                        </div>
                        <AddIcon className="m-4 hover:text-rav-mango  " />
                    </div>
                    <div className="card hover:border border-rav-mango ">
                        {showUpdateForm && <ChangeAvatar />}
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    )
}

export default Profile

// AVATAR And login name
//<div>
//<div className="flex items-center justify-end p-2">
//<p className=" p-2 ">
//{profile.name}
/*</p>
<img
    src={profile.avatar.url}
    alt="avatar"
    className="w-10 h-10 rounded-full "
/>
</div>
</div>*/
