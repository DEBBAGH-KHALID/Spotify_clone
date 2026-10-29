import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as auth from '@/services/authService'

// Hors de la fonction : un seul état partagé dans toute l'application
const currentUser = ref(auth.getCurrentUser())

export function useAuth() {
  const router = useRouter()
  const route = useRoute()

  const isLoggedIn = computed(() => Boolean(currentUser.value))

  function redirectAfterAuth() {
    const target = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
      ? route.query.redirect
      : '/'
    router.push(target)
  }

  async function login(email, password) {
    currentUser.value = await auth.loginUser(email, password)
    redirectAfterAuth()
  }

  async function register(data) {
    currentUser.value = await auth.registerUser(data)
    redirectAfterAuth()
  }

  function loginDemo(provider) {
    currentUser.value = auth.loginDemo(provider)
    redirectAfterAuth()
  }

  function logout() {
    auth.logoutUser()
    currentUser.value = null
    router.push({ name: 'login' })
  }

  return {
    currentUser, isLoggedIn,
    login, register, loginDemo, logout,
    emailExists: auth.emailExists,
  }
}