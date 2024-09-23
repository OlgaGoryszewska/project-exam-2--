import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Venue from './pages/Venue'

function App() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Venue/:id" element={<Venue />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Login />} />

            </Routes>
        </div>
    )
}

export default App
