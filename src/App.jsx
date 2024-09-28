import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import { fetchProfile } from './services/fetchProfile'
import { loadLocalStorage } from './storage/loadLocalStorage'
import { useEffect, useState } from 'react'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Venue from './pages/Venue'

function App() {
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const storedProfile = loadLocalStorage('profile')
        const profileName = storedProfile?.name
        const accessToken = loadLocalStorage('token')

        if (profileName && accessToken) {
            fetchProfile(profileName, accessToken)
                .then((data) => {
                    setProfile(data)
                })
                .catch((error) => {
                    console.error('Error fetching profile:', error)
                })
        } else {
            setProfile(null)
        }
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Nav profile={profile} />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home profile={profile} />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/Venue/:id"
                        element={<Venue profile={profile} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/profile"
                        element={<Profile profile={profile} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App
