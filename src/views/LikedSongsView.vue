
<script setup>
import { useLibrary } from '@/composables/useLibrary'

const { likedSongs, toggleLike } = useLibrary()
</script>

<template>
  <section class="min-h-screen text-white">
    <div class="mb-8 flex items-center gap-5">
      <div class="grid size-28 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-700 text-5xl">
        ♥
      </div>

      <div>
        <p class="text-sm">Playlist</p>
        <h1 class="text-4xl font-black">Liked Songs</h1>
        <p class="mt-2 text-gray-400">
          {{ likedSongs.length }} morceau(x)
        </p>
      </div>
    </div>

    <p v-if="likedSongs.length === 0" class="text-gray-400">
      Aucun favori pour le moment. Ajoute des morceaux depuis Search.
    </p>

    <div v-else class="space-y-3">
      <div
        v-for="(song, index) in likedSongs"
        :key="song.id"
        class="flex items-center gap-4 rounded-lg p-3 hover:bg-white/10"
      >
        <span class="w-6 text-gray-400">{{ index + 1 }}</span>

        <img
          :src="song.image || song.cover"
          :alt="song.title"
          class="size-12 rounded object-cover"
        />

        <div class="min-w-0 flex-1">
          <p class="truncate font-bold">{{ song.title }}</p>
          <p class="truncate text-sm text-gray-400">{{ song.artist }}</p>
        </div>

        <button
          @click="toggleLike(song)"
          class="text-green-400 hover:text-white"
          aria-label="Retirer des favoris"
        >
          ♥
        </button>
      </div>
    </div>
  </section>
</template>
