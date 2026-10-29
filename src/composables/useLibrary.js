
import { ref, watch } from 'vue'
import { loadData, saveData } from '@/services/storageService'

const likedSongs = ref(loadData('liked-songs', []))

watch(
  likedSongs,
  songs => saveData('liked-songs', songs),
  { deep: true }
)

export function useLibrary() {
  function isLiked(song) {
    return likedSongs.value.some(item => item.id === song.id)
  }

  function toggleLike(song) {
    if (isLiked(song)) {
      likedSongs.value = likedSongs.value.filter(
        item => item.id !== song.id
      )
    } else {
      likedSongs.value.push(song)
    }
  }

  return {
    likedSongs,
    isLiked,
    toggleLike
  }
}
