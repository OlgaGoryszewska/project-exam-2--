import propTypes from 'prop-types'

export const NavAvatar = ({ profile }) => {
    return (
        <div>
            <div className="flex items-center justify-end p-2">
                <p className="p-2 ">{profile.name}</p>
                <img
                    src={profile.avatar.url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-fit"
                />
            </div>
        </div>
    )
}

NavAvatar.propTypes = {
    profile: propTypes.object,
}
