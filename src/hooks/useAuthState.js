import { useEffect, useState } from 'react'
import { fetchProfile } from '../services/fetchProfile'
import { loadLocalStorage } from '../storage/loadLocalStorage'
/**
 *
 * @returns {{ profile: object | null, loading: boolean, error: Error | null }}
 */
export const useAuthState = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const storedProfile = loadLocalStorage('profile')
        const profileName = storedProfile?.name
        const accessToken = loadLocalStorage('token')

        const fetchProfileData = async () => {
            try {
                const data = await fetchProfile(profileName, accessToken)
                setProfile(data ?? null)
            } catch (error) {
                console.error('Error fetching profile:', error)
                setError(error)
                setProfile(null)
            } finally {
                setLoading(false)
            }
        }

        if (profileName && accessToken) {
            fetchProfileData()
        } else {
            setProfile(null)
            setLoading(false)
        }
    }, [])

    return {
        profile,
        loading,
        error,
    }
}