<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { handleSpotifyCallback } from '@/services/spotifyService'

const router = useRouter()
const route = useRoute()
const error = ref('')

onMounted(async () => {
  const { code, error: err } = route.query
  if (err || !code) {
    error.value = 'Connexion Spotify annulée.'
    return
  }
  try {
    await handleSpotifyCallback(String(code))
    router.replace({ name: 'search' })
  } catch (e) {
    error.value = e.message
  }
})
</script>

<template>
  <main class="grid h-full place-items-center bg-spotify-base text-center">
    <div v-if="error">
      <p class="mb-4 text-red-400">{{ error }}</p>
      <RouterLink to="/" class="rounded-full bg-spotify-green px-6 py-2 font-bold text-black">Retour</RouterLink>
    </div>
    <p v-else class="text-spotify-gray">Connexion à Spotify…</p>
  </main>
</template>