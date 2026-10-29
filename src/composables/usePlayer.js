
import { ref, computed } from 'vue'

const currentSong = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.7)

const audio = new Audio()
audio.volume = volume.value

audio.addEventListener('timeupdate', () => {
  currentTime.value = audio.currentTime
})

audio.addEventListener('loadedmetadata', () => {
  duration.value = audio.duration || 0
})

audio.addEventListener('ended', () => {
  isPlaying.value = false
})

audio.addEventListener('pause', () => {
  isPlaying.value = false
})

audio.addEventListener('play', () => {
  isPlaying.value = true
})

async function playSong(song) {
  if (!song) return

  if (currentSong.value?.id === song.id) {
    if (audio.paused) {
      await audio.play()
    } else {
      audio.pause()
    }
    return
  }

  currentSong.value = song
  audio.src = song.audio
  currentTime.value = 0

  try {
    await audio.play()
  } catch (error) {
    isPlaying.value = false
    console.error('Impossible de lire ce fichier audio :', error)
  }
}

function togglePlay() {
  if (!currentSong.value) return

  if (audio.paused) {
    audio.play().catch(error => {
      console.error('Erreur de lecture :', error)
    })
  } else {
    audio.pause()
  }
}

function seek(time) {
  if (Number.isFinite(time) && duration.value > 0) {
    audio.currentTime = Math.max(0, Math.min(time, duration.value))
  }
}

function setVolume(value) {
  volume.value = Number(value)
  audio.volume = volume.value
}

const progress = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

export function usePlayer() {
  return {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    progress,
    playSong,
    togglePlay,
    seek,
    setVolume,
    formatTime
  }
}
