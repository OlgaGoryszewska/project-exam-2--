import { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleLogout } from '../handlers/logout'

//Icons
import palm from '../assets/img/palm.png'

function DropDownMenu() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <button onClick={() => setShowMenu(!showMenu)}>
                <img
                    className="relative h-8 z-40 pr-4 "
                    src={palm}
                    alt="menu icon"
                />
            </button>
            {showMenu && (
                <nav
                    className=" flex flex-row justify-center pt-10 absolute bg-deep-blue w-full h-full z-30
         "
                >
                    <ul>
                        <li className="pt-6">
                            <Link
                                onClick={() => setShowMenu(!showMenu)}
                                className="link"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="pt-4">
                            <Link
                                onClick={() => setShowMenu(!showMenu)}
                                className="link"
                                to="/login"
                            >
                                Login
                            </Link>
                        </li>
                        <li className="pt-4">
                            <Link
                                onClick={() => setShowMenu(!showMenu)}
                                className="link"
                                to="/register"
                            >
                                Register
                            </Link>
                        </li>
                        <li className="pt-4">
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
}
export default DropDownMenu
