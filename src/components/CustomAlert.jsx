import { useEffect } from 'react'
import PropTypes from 'prop-types'

//Icons
import CheckIcon from '@mui/icons-material/Check'

export const CustomAlert = ({ message, onClose, duration = 4000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)
        return () => clearTimeout(timer)
    }, [onClose, duration])

    return (
        <div>
            <div className={`alert-custom `}>
                <CheckIcon className="m-auto text-lg " />
                <p className="pt-4 mx-auto">{message}</p>
                <button onClick={onClose}></button>
            </div>
        </div>
    )
}

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
}
