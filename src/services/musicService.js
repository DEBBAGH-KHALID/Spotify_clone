
import { songs } from '@/data/songs'

export function searchSongs(query) {
  const text = query.trim().toLowerCase()

  if (!text) {
    return []
  }

  return songs.filter(song =>
    song.title.toLowerCase().includes(text) ||
    song.artist.toLowerCase().includes(text) ||
    song.album.toLowerCase().includes(text)
  )
}
