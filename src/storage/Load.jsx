export function Load(key) {
    return JSON.parse(localStorage.getItem(key))
}
