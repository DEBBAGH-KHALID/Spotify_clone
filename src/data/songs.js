const SH = (n) => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`

export const songs = [
  { id: 's1', title: 'Neon Streets', artistId: 'ar1', albumId: 'al1', duration: 372, audioUrl: SH(1), explicit: false },
  { id: 's2', title: 'Midnight Signals', artistId: 'ar1', albumId: 'al1', duration: 425, audioUrl: SH(2), explicit: false },
  { id: 's3', title: 'Silver Tides', artistId: 'ar2', albumId: 'al2', duration: 344, audioUrl: SH(3), explicit: false },
  { id: 's4', title: 'Moonlit Drive', artistId: 'ar2', albumId: 'al2', duration: 305, audioUrl: SH(4), explicit: true },
  { id: 's5', title: 'Paper Boats', artistId: 'ar3', albumId: 'al3', duration: 355, audioUrl: SH(5), explicit: false },
  { id: 's6', title: 'Slow River', artistId: 'ar3', albumId: 'al3', duration: 405, audioUrl: SH(6), explicit: false },
  { id: 's7', title: 'Pulse Theory', artistId: 'ar4', albumId: 'al4', duration: 421, audioUrl: SH(7), explicit: false },
  { id: 's8', title: 'Drop the Floor', artistId: 'ar4', albumId: 'al4', duration: 339, audioUrl: SH(8), explicit: true },
  { id: 's9', title: 'Golden Hour', artistId: 'ar5', albumId: 'al5', duration: 372, audioUrl: SH(9), explicit: false },
  // Exemple de morceau sans audio : le bouton Play sera désactivé et l'état affiché
  { id: 's10', title: 'Lost Tape', artistId: 'ar5', albumId: 'al5', duration: 200, audioUrl: null, explicit: false },
]