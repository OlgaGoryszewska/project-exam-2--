import React, { useEffect, useState } from 'react'
const API_BASE_URL = 'https://v2.api.noroff.dev'
const API_KEY = import.meta.env.VITE_API_KEY

export const ProfileRender = () => {
    const [userName, setUserName] = useState('userName')
    const accessToken = JSON.parse(localStorage.getItem('token'))
    const profile = JSON.parse(localStorage.getItem('profile'))
    console.log('this is the access token', accessToken)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/holidaze/profiles/${profile.name}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                            'X-Noroff-API-Key': API_KEY,
                        },
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    setUserName(data.data)
                } else {
                    console.error(
                        'Error fetching profile:',
                        response.statusText
                    )
                }
            } catch (error) {
                console.error('Error fetching profile:', error)
            }
        }

        fetchProfile()
    }, [accessToken, profile.name])

    if (!accessToken) {
        return <div>Loading profile...</div>
    }

    return (
        <div className="profile-page">
            <h1>Welcome, {userName.name}</h1>
        </div>
    )
}

export default ProfileRender
