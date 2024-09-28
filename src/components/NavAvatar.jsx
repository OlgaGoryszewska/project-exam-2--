
import propTypes from 'prop-types'
import { loadLocalStorage } from '../storage/loadLocalStorage'

export const NavAvatar = ({ profile }) => {
    const authProfile = loadLocalStorage.getItem('token')
    if (authProfile.ok)
        return (
            <div>
                <div className="flex items-center justify-end p-2">
                    <p className="p-2">{profile.name}</p>
                    <img
                        src={profile.avatar.url}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
            </div>
        )
}

NavAvatar.propTypes = {
    profile: propTypes.object,
}
