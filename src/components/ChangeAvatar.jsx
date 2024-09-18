import { useState } from 'react'
import { updateAvatar } from '../services/updateAvatar'

const ChangeAvatar = () => {
    const [formData, setFormData] = useState({
        avatarUrl: '',
        avatarAlt: '',
    })

    const [error, setError] = useState('')

    const handleInputChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        setFormData({
            ...formData,
            [inputName]: inputValue,
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        const avatar =
            formData.avatarUrl === ''
                ? undefined
                : {
                      url: formData.avatarUrl,
                      alt: formData.avatarAlt,
                  }
        try {
            const newAvatar = {
                avatar: avatar,
            }

            await updateAvatar(newAvatar)
            alert('Avatar changed successfully')
        } catch (error) {
            setError('Error changing Avatar: ' + error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>} {}
            <p>Change Avatar</p>
            <input
                type="text"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleInputChange}
                placeholder="Avatar URL"
                className="border rounded p-2 w-full"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                Register
            </button>
        </form>
    )
}
export default ChangeAvatar
