export function saveLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}