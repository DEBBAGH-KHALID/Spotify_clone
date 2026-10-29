import { storage, asArray } from './storageService'

const USERS_KEY = 'users'
const SESSION_KEY = 'session'
const ITERATIONS = 100_000

// ---------- Utilitaires ----------
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const normalizeEmail = (e) => String(e || '').trim().toLowerCase()

const toHex = (buf) =>
  Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('')

function randomSalt() {
  return toHex(crypto.getRandomValues(new Uint8Array(16)))
}

async function hashPassword(password, salt) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: ITERATIONS, hash: 'SHA-256' },
    key, 256,
  )
  return toHex(bits)
}

const getUsers = () => asArray(storage.get(USERS_KEY, []))
const saveUsers = (users) => storage.set(USERS_KEY, users)

// Ne jamais exposer hash/sel à l'interface
const publicUser = ({ passwordHash, salt, ...rest }) => rest

// ---------- API publique ----------
export function emailExists(email) {
  const e = normalizeEmail(email)
  return getUsers().some((u) => u.email === e)
}

export function getCurrentUser() {
  const session = storage.get(SESSION_KEY)
  if (!session?.userId) return null
  const user = getUsers().find((u) => u.id === session.userId)
  if (!user) { storage.remove(SESSION_KEY); return null } // session orpheline
  return publicUser(user)
}

function startSession(user) {
  storage.set(SESSION_KEY, { userId: user.id, createdAt: Date.now() })
  return publicUser(user)
}

export async function registerUser({ username, email, password, birthDate }) {
  const e = normalizeEmail(email)
  if (emailExists(e)) throw new Error('Un compte existe déjà avec cet email.')
  const salt = randomSalt()
  const user = {
    id: `u_${crypto.randomUUID()}`,
    username: String(username).trim(),
    displayName: String(username).trim(),
    email: e,
    birthDate: birthDate || null,
    avatar: null,
    isDemo: false,
    salt,
    passwordHash: await hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  }
  saveUsers([...getUsers(), user])
  return startSession(user)
}

export async function loginUser(email, password) {
  const user = getUsers().find((u) => u.email === normalizeEmail(email))
  // Message identique dans les deux cas pour ne pas révéler quels emails existent
  const fail = () => new Error('Email ou mot de passe incorrect.')
  if (!user || user.isDemo) throw fail()
  const hash = await hashPassword(password, user.salt)
  if (hash !== user.passwordHash) throw fail()
  return startSession(user)
}

// Connexion de démonstration (Google, Facebook, Apple, téléphone) : AUCUNE vraie authentification
export function loginDemo(provider) {
  const email = `demo-${provider}@demo.local`
  let user = getUsers().find((u) => u.email === email)
  if (!user) {
    user = {
      id: `u_demo_${provider}`,
      username: `Demo ${provider}`,
      displayName: `Demo ${provider}`,
      email,
      birthDate: null,
      avatar: null,
      isDemo: true,
      salt: '',
      passwordHash: '',
      createdAt: new Date().toISOString(),
    }
    saveUsers([...getUsers(), user])
  }
  return startSession(user)
}

export function logoutUser() {
  storage.remove(SESSION_KEY)
}