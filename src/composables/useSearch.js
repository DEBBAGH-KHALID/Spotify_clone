
import { ref, computed } from 'vue'
import { searchSongs } from '@/services/musicService'

export function useSearch() {
  const query = ref('')

  const results = computed(() => {
    return searchSongs(query.value)
  })

  return {
    query,
    results
  }
}
