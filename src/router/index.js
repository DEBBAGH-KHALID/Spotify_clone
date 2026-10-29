import { createRouter, createWebHistory } from 'vue-router'
import { storage } from '@/services/storageService'

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue'), meta: { guest: true } },
  { path: '/signup', name: 'signup', component: () => import('@/views/SignupView.vue'), meta: { guest: true } },
  {
    path: '/',
    component: () => import('@/components/layout/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
      { path: 'search', name: 'search', component: () => import('@/views/SearchView.vue') },
      { path: 'library', name: 'library', component: () => import('@/views/LibraryView.vue') },
      { path: 'playlist/:id', name: 'playlist', component: () => import('@/views/PlaylistView.vue'), props: true },
      { path: 'album/:id', name: 'album', component: () => import('@/views/AlbumView.vue'), props: true },
      { path: 'artist/:id', name: 'artist', component: () => import('@/views/ArtistView.vue'), props: true },
      { path: 'liked', name: 'liked', component: () => import('@/views/LikedSongsView.vue') },
      { path: 'profile', name: 'profile', component: () => import('@/views/ProfileView.vue') },
      { path: 'settings', name: 'settings', component: () => import('@/views/SettingsView.vue') },
    ],
  },
  // Retour de Spotify après autorisation PKCE
  { path: '/callback', name: 'spotify-callback', component: () => import('@/views/SpotifyCallbackView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const session = storage.get('session') // { userId, ... } posé par authService (étape 3)
  const loggedIn = Boolean(session?.userId)
  if (to.meta.requiresAuth && !loggedIn) return { name: 'login', query: { redirect: to.fullPath } }
  if (to.meta.guest && loggedIn) return { name: 'home' }
})

export default router