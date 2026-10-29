const img = (seed) => `https://picsum.photos/seed/${seed}/400`

export const playlists = [
  { id: 'pl1', name: 'Daily Mix 1', description: 'Neon Harbor, Luna Vega et plus', cover: img('dailymix1'), songIds: ['s1', 's3', 's5', 's7'], editorial: true },
  { id: 'pl2', name: 'Chill Vibes', description: 'Pour se détendre', cover: img('chillvibes'), songIds: ['s3', 's5', 's6', 's9'], editorial: true },
  { id: 'pl3', name: 'Workout Energy', description: 'Rythmes soutenus', cover: img('workout'), songIds: ['s7', 's8', 's2', 's4'], editorial: true },
]

export const radios = [
  { id: 'rd1', title: 'Neon Harbor Radio', subtitle: 'Avec Luna Vega, Kodo Beats', color: '#e8115b', artistId: 'ar1', songIds: ['s1', 's2', 's7'] },
  { id: 'rd2', title: 'Luna Vega Radio', subtitle: 'Avec Mira Sol, Neon Harbor', color: '#1e3264', artistId: 'ar2', songIds: ['s3', 's4', 's9'] },
  { id: 'rd3', title: 'Kodo Beats Radio', subtitle: 'Avec The Quiet Rivers', color: '#8d67ab', artistId: 'ar4', songIds: ['s7', 's8', 's5'] },
  { id: 'rd4', title: 'Quiet Rivers Radio', subtitle: 'Avec Mira Sol', color: '#477d95', artistId: 'ar3', songIds: ['s5', 's6', 's9'] },
]