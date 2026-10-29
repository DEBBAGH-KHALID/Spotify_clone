<script setup>
import { RouterLink } from 'vue-router'
import {
  Home,
  Search,
  Library,
  Heart,
  Plus,
  Music
} from 'lucide-vue-next'

import { playlists } from '@/data/playlists'
</script>

<template>
  <aside class="flex h-full flex-col gap-6 rounded-lg bg-[#121212] p-5">

    <RouterLink to="/" class="flex items-center gap-3 text-white">
      <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" alt="Spotify Logo"
        class="h-10 w-10" />

      <span class="text-2xl font-bold tracking-tight">
        Spotify
      </span>
    </RouterLink>


    <nav class="space-y-4">
      <RouterLink to="/" class="flex items-center gap-3 text-spotify-gray hover:text-white">
        <Home class="size-6" />
        Home
      </RouterLink>

      <RouterLink to="/search" class="flex items-center gap-3 text-spotify-gray hover:text-white">
        <Search class="size-6" />
        Search
      </RouterLink>
    </nav>

    <div>
      <div class="mb-4 flex items-center justify-between">
        <RouterLink to="/library" class="flex items-center gap-2 font-bold text-spotify-gray hover:text-white">
          <Library class="size-6" />
          Your Library
        </RouterLink>

        <button title="Create playlist" class="text-spotify-gray hover:text-white">
          <Plus class="size-5" />
        </button>
      </div>

      <RouterLink to="/liked" class="mb-4 flex items-center gap-3 rounded p-2 hover:bg-[#282828]">
        <span class="grid size-12 place-items-center rounded bg-gradient-to-br from-indigo-500 to-purple-700">
          <Heart class="size-6 fill-white" />
        </span>

        <span>
          <span class="block font-semibold">Liked Songs</span>
          <span class="text-xs text-spotify-gray">Your favorite tracks</span>
        </span>
      </RouterLink>

      <div class="space-y-1">
        <RouterLink v-for="playlist in playlists" :key="playlist.id" :to="`/playlist/${playlist.id}`"
          class="block rounded p-2 hover:bg-[#282828]">
          <span class="block truncate text-sm">{{ playlist.name }}</span>
          <span class="text-xs text-spotify-gray">Playlist</span>
        </RouterLink>
      </div>
    </div>

    <div class="mt-auto rounded-lg bg-[#242424] p-4">
      <h3 class="font-bold">Explore Premium</h3>

      <p class="my-2 text-sm text-spotify-gray">
        Discover more ways to enjoy your music.
      </p>

      <button class="rounded-full bg-white px-4 py-2 text-sm font-bold text-black hover:scale-105">
        Explore
      </button>
    </div>
  </aside>
</template>
