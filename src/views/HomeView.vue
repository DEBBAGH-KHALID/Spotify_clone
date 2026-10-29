
<script setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

import MusicCard from '@/components/music/MusicCard.vue'

import { artists } from '@/data/artists'
import { albums } from '@/data/albums'
import { playlists, radios } from '@/data/playlists'
import { podcasts } from '@/data/podcasts'

const { currentUser } = useAuth()

const userName = computed(() => {
  return currentUser.value?.displayName || 'Music lover'
})

function getArtistName(artistId) {
  return artists.find(artist => artist.id === artistId)?.name || 'Unknown artist'
}
</script>

<template>
  <div class="space-y-10">

    <!-- Welcome -->
    <section>
      <h1 class="text-3xl font-black sm:text-4xl">
        Good evening, {{ userName }}
      </h1>

      <p class="mt-2 text-spotify-gray">
        Discover your next favorite song.
      </p>
    </section>

    <!-- Quick playlists -->
    <section>
      <h2 class="mb-4 text-2xl font-bold">Made for you</h2>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <RouterLink
          v-for="playlist in playlists"
          :key="playlist.id"
          :to="`/playlist/${playlist.id}`"
          class="flex items-center gap-4 overflow-hidden rounded bg-white/10 transition hover:bg-white/20"
        >
          <img
            :src="playlist.cover"
            :alt="playlist.name"
            class="size-20 object-cover"
          />

          <span class="truncate pr-3 font-bold">
            {{ playlist.name }}
          </span>
        </RouterLink>
      </div>
    </section>

    <!-- Albums -->
    <section>
      <h2 class="mb-4 text-2xl font-bold">Popular albums</h2>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        <MusicCard
          v-for="album in albums"
          :key="album.id"
          :title="album.title"
          :subtitle="`${getArtistName(album.artistId)} · ${album.year}`"
          :image="album.cover"
          :to="`/album/${album.id}`"
        />
      </div>
    </section>

    <!-- Artists -->
    <section>
      <h2 class="mb-4 text-2xl font-bold">Popular artists</h2>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        <MusicCard
          v-for="artist in artists"
          :key="artist.id"
          :title="artist.name"
          :subtitle="'Artist'"
          :image="artist.image"
          :to="`/artist/${artist.id}`"
        />
      </div>
    </section>

    <!-- Radio -->
    <section>
      <h2 class="mb-4 text-2xl font-bold">Popular radio</h2>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        <MusicCard
          v-for="radio in radios"
          :key="radio.id"
          :title="radio.title"
          :subtitle="radio.subtitle"
          :image="artists.find(a => a.id === radio.artistId)?.image || ''"
          :to="`/artist/${radio.artistId}`"
        />
      </div>
    </section>

    <!-- Podcasts -->
    <section>
      <h2 class="mb-4 text-2xl font-bold">Podcasts</h2>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        <MusicCard
          v-for="podcast in podcasts"
          :key="podcast.id"
          :title="podcast.title"
          :subtitle="podcast.description"
          :image="podcast.cover"
          to="/search"
        />
      </div>
    </section>

  </div>
</template>
