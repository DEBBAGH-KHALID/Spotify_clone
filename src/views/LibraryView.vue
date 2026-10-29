
<script setup>
import { useLibrary } from '@/composables/useLibrary'
import { playlists } from '@/data/playlists'

const { likedSongs } = useLibrary()
</script>

<template>
  <section class="min-h-screen text-white">
    <h1 class="mb-6 text-3xl font-black">Your Library</h1>

    <RouterLink
      to="/liked"
      class="mb-4 flex items-center gap-4 rounded-lg bg-[#181818] p-4 hover:bg-[#282828]"
    >
      <div class="grid size-16 place-items-center rounded bg-gradient-to-br from-indigo-500 to-purple-700 text-2xl">
        ♥
      </div>

      <div>
        <h2 class="font-bold">Liked Songs</h2>
        <p class="text-sm text-gray-400">
          {{ likedSongs.length }} morceau(x)
        </p>
      </div>
    </RouterLink>

    <h2 class="mb-4 mt-8 text-xl font-bold">Your playlists</h2>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <RouterLink
        v-for="playlist in playlists"
        :key="playlist.id"
        :to="`/playlist/${playlist.id}`"
        class="rounded-lg bg-[#181818] p-4 hover:bg-[#282828]"
      >
        <img
          :src="playlist.cover"
          :alt="playlist.name"
          class="mb-3 aspect-square w-full rounded object-cover"
        />

        <h3 class="truncate font-bold">{{ playlist.name }}</h3>
        <p class="text-sm text-gray-400">Playlist</p>
      </RouterLink>
    </div>
  </section>
</template>
