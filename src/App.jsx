import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Venue from './pages/Venue'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Venue/:id" element={<Venue />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}

export default App
