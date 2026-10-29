const PREFIX = 'sclone:v1:'

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      return raw === null ? fallback : JSON.parse(raw)
    } catch {
      return fallback // JSON invalide ou storage indisponible
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
      return true
    } catch {
      return false // quota dépassé, navigation privée...
    }
  },
  remove(key) {
    try { localStorage.removeItem(PREFIX + key) } catch { /* ignore */ }
  },
}

// Données privées isolées par compte : userStorage(userId).get('playlists', [])
export function userStorage(userId) {
  const k = (name) => `user:${userId}:${name}`
  return {
    get: (name, fallback) => storage.get(k(name), fallback),
    set: (name, value) => storage.set(k(name), value),
    remove: (name) => storage.remove(k(name)),
  }
}

// Helpers qui valident le type pour éviter les crashs sur données corrompues
export const asArray = (v) => (Array.isArray(v) ? v : [])
export const asObject = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {})