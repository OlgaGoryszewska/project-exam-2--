const API_BASE_URL = 'https://v2.api.noroff.dev'

export const registerUser = async (user) => {
    console.log('user', user)
    console.log('startingFetch')
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        console.log('response', response)
        if (!response.ok) {
            throw new Error('Error registering user')
        }

        const data = await response.json()
        console.log('data', data)
        return data
    } catch (error) {
        console.error('Error registering user:', error)
        throw error
    }
}

