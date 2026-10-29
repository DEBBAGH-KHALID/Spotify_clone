const img = (seed, size = 400) => `https://picsum.photos/seed/${seed}/${size}`

export const artists = [
  { id: 'ar1', name: 'Neon Harbor', image: img('neonharbor'), followers: 1280400, popularity: 82 },
  { id: 'ar2', name: 'Luna Vega', image: img('lunavega'), followers: 934200, popularity: 77 },
  { id: 'ar3', name: 'The Quiet Rivers', image: img('quietrivers'), followers: 412900, popularity: 64 },
  { id: 'ar4', name: 'Kodo Beats', image: img('kodobeats'), followers: 2210000, popularity: 88 },
  { id: 'ar5', name: 'Mira Sol', image: img('mirasol'), followers: 188300, popularity: 55 },
]