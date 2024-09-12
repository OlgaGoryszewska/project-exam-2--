import PropTypes from 'prop-types'
import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarOutlineIcon from '@mui/icons-material/StarOutline'

function StarRating({ rating }) {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
        <>
            {Array(fullStars)
                .fill()
                .map((_, index) => (
                    <StarIcon key={index} className="star" />
                ))}
            {halfStar && <StarHalfIcon className="star" />}
            {Array(emptyStars)
                .fill()
                .map((_, index) => (
                    <StarOutlineIcon key={index + fullStars} className="star" />
                ))}
        </>
    )
}

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
}

export default StarRating
