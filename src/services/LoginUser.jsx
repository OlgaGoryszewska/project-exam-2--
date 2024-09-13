const API_BASE_URL = 'https://v2.api.noroff.dev'
const API_KEY = import.meta.env.VITE_API_KEY

import { Save } from '../storage/Save'

export async function loginUser(object) {

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
            },
            body: JSON.stringify(object),
        });
        
        const responseData = await response.json();

        if (response.ok) {
            const { data } = responseData;
            const { accessToken, ...profile } = data;

            Save('token', accessToken)
            Save('profile', profile)

            return profile;
        } else {
            throw new Error(responseData.error)
        }
    } catch (error) {
        console.error('Error logging in user:', error)
        throw error
    }
}
