const img = (seed) => `https://picsum.photos/seed/${seed}/400`

export const albums = [
  { id: 'al1', title: 'Midnight Signals', artistId: 'ar1', year: 2023, type: 'album', cover: img('midnightsignals') },
  { id: 'al2', title: 'Silver Tides', artistId: 'ar2', year: 2022, type: 'album', cover: img('silvertides') },
  { id: 'al3', title: 'Paper Boats', artistId: 'ar3', year: 2024, type: 'album', cover: img('paperboats') },
  { id: 'al4', title: 'Pulse Theory', artistId: 'ar4', year: 2021, type: 'album', cover: img('pulsetheory') },
  { id: 'al5', title: 'Golden Hour', artistId: 'ar5', year: 2024, type: 'single', cover: img('goldenhour') },
]