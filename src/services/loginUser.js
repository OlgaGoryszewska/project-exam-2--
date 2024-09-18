import { API_BASE_URL } from '../constants'
import { API_KEY } from '../constants'

import { saveLocalStorage } from '../storage/saveLocalStorage'

export async function loginUser(object) {

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
            },
            body: JSON.stringify(object),
        })

        const responseData = await response.json()

        if (response.ok) {
            const { data } = responseData
            const { accessToken, ...profile } = data

            saveLocalStorage('token', accessToken)
            saveLocalStorage('profile', profile)

            return profile
        } else {
            throw new Error(responseData.error)
        }
    } catch (error) {
        console.error('Error logging in user:', error)
        throw error
    }
}
