import React, { useEffect, useState } from 'react';

const ProfileRender = () => {
    const [profile, setProfile] = useState(null); // State to hold profile data
    const token = localStorage.getItem('token');  // Get token from localStorage

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/<name>`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`  // Include token in Authorization header
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data.data); // Assuming profile data is in "data" object
                } else {
                    console.error('Error fetching profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [token]);

    if (!profile) {
        return <div>Loading profile...</div>; // Show loading while fetching data
    }

    return (
        <div className="profile-page">
            <h1>Welcome, {profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>Bio: {profile.bio || 'No bio available'}</p>
            
            {/* Display avatar */}
            {profile.avatar && (
                <div className="profile-avatar">
                    <img src={profile.avatar.url} alt={profile.avatar.alt || 'Avatar'} />
                </div>
            )}

            {/* Display banner */}
            {profile.banner && (
                <div className="profile-banner">
                    <img src={profile.banner.url} alt={profile.banner.alt || 'Banner'} />
                </div>
            )}

            {/* Display venue manager status */}
            <p>Venue Manager: {profile.venueManager ? 'Yes' : 'No'}</p>

            {/* Display counts of venues and bookings */}
            <p>Venues: {profile._count?.venues || 0}</p>
            <p>Bookings: {profile._count?.bookings || 0}</p>
        </div>
    );
};

export default ProfileRender;
