import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { handleLogout } from '../handlers/logout'
import { gsap } from 'gsap'

// Icons
import palm from '../assets/img/palm.png'

function DropDownMenu() {
    const [showMenu, setShowMenu] = useState(false)
    const token = localStorage.getItem('token')
    const palmRef = useRef(null)

    const handleClickAnimation = () => {
        gsap.fromTo(
            palmRef.current,
            { rotation: 0, scale: 1 },
            { rotation: 360, scale: 1.2, duration: 1, ease: 'power2.inOut' }
        )
        setShowMenu(!showMenu)
    }
    const handleHoverAnimation = () => {
        gsap.to(palmRef.current, {
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out',
        })
    }

    const handleHoverLeaveAnimation = () => {
        gsap.to(palmRef.current, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        })
    }

    if (token) {
        return (
            <>
                <button onClick={handleClickAnimation}>
                    <img
                        className="relative h-8 z-40 pr-4"
                        src={palm}
                        alt="menu icon"
                        ref={palmRef}
                        onMouseEnter={handleHoverAnimation}
                        onMouseLeave={handleHoverLeaveAnimation}
                    />
                </button>
                {showMenu && (
                    <nav className="flex flex-row justify-center pt-10 absolute bg-deep-blue w-full h-full z-30">
                        <ul className="flex flex-col">
                            <li className="pt-12 mx-auto">
                                <Link
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="link"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="pt-5 mx-auto">
                                <Link
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="link"
                                    to="/profile"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li className="pt-5 mx-auto">
                                <Link
                                    onClick={() => {
                                        setShowMenu(!showMenu)
                                        handleLogout()
                                    }}
                                    className="link"
                                    to="/"
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </>
        )
    } else {
        return (
            <>
                <button onClick={handleClickAnimation}>
                    <img
                        className="relative h-8 z-40 pr-4"
                        src={palm}
                        alt="menu icon"
                        ref={palmRef}
                        onMouseEnter={handleHoverAnimation}
                        onMouseLeave={handleHoverLeaveAnimation}
                    />
                </button>
                {showMenu && (
                    <nav className="flex flex-row justify-center pt-10 absolute bg-deep-blue w-full h-full z-30">
                        <ul className="flex flex-col">
                            <li className="pt-12 mx-auto">
                                <Link
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="link"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="pt-5 mx-auto">
                                <Link
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="link"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </li>
                            <li className="pt-5 mx-auto">
                                <Link
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="link"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </>
        )
    }
}

export default DropDownMenu
