export const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    alert('Logged out!')
    window.location.href = '/'
}


