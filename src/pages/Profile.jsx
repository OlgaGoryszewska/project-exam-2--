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
            <h1>Profile</h1>
            {profile ? (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    )
}

export default Profile
