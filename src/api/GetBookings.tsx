const API_BASE_URL = 'https://v2.api.noroff.dev'
const API_KEY = (import.meta as any).env.VITE_API_KEY
import { Load } from '../storage/Load'

export async function GetBookings () {
    const response = await fetch(API_BASE_URL + "/holidaze/bookings",{
        headers: {
            Authorization: `Bearer ${Load('token')}`,
            "X-Noroff-API-Key": API_KEY
        }
    }); return await response.json()
}
