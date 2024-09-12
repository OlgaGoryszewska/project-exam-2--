const API_BASE_URL = 'https://v2.api.noroff.dev'
const API_KEY = import.meta.env.VITE_API_KEY

import { Save } from '../storage/Save'

async function loginUser(email, password) {
    try {
        const response = await fetch(API_BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        if (response.ok) {
            const { accessToken, ...profile } = await response.json()
            Save('token', accessToken)
            Save('profile', profile)
            return profile
        }
    } catch (error) {
        console.error('Error logging in user:', error)
        throw error
    }
}

export default loginUser
