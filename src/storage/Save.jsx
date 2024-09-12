export function Save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}