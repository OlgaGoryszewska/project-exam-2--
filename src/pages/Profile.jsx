import { fetchProfile } from '../services/fetchProfile'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from '../storage/loadLocalStorage'

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
                    <div className="flex items-center justify-end p-2">
                        <p className=" p-2 ">
                            {profile.name}
                        </p>
                        <img
                            src={profile.avatar.url}
                            alt="avatar"
                            className="w-10 h-10 rounded-full "
                        />
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    )
}

export default Profile
