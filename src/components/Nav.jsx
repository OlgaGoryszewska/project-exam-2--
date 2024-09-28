import logo from '../assets/img/logo.png'
import DropDownMenu from './DropDownMenu'
import { NavAvatar } from './NavAvatar'
import PropTypes from 'prop-types';

function Nav({ profile }) {
    return (
        <>

            <header className="flex flex-row justify-between bg-deep-blue h-12">
                <img
                    className=" z-40 h-11 "
                    src={logo}
                    alt="Logo for a nav bar"
                />
                <DropDownMenu />
            </header>
            
            {profile && <NavAvatar profile={profile}/>}
        </>
    )
}

Nav.propTypes = {
    profile: PropTypes.object
};

export default Nav
