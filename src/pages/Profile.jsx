import { fetchProfile } from '../services/fetchProfile'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'

//Icons

import CabinIcon from '@mui/icons-material/Cabin'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility'
import AddHomeIcon from '@mui/icons-material/AddHome'
import AddIcon from '@mui/icons-material/Add'

function Profile() {
    const [profile, setProfile] = useState(null)

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
                        className="w-full h-40 object-cover mb-4"
                        src={profile.banner.url}
                        alt="banner for a profile"
                    />
                    <div className="card ">
                        <h3 className="pt-4">{profile.name}</h3>
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
                        <AddIcon className="m-4 " />
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

