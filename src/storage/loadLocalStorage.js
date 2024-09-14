export function loadLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
