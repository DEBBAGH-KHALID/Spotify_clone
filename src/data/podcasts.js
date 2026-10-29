const img = (seed) => `https://picsum.photos/seed/${seed}/400`

export const podcasts = [
  { id: 'pc1', title: 'Code & Café', host: 'Sara Benali', cover: img('codecafe'), description: 'Le développement web raconté simplement.' },
  { id: 'pc2', title: 'Sons du Monde', host: 'Youssef Amrani', cover: img('sonsdumonde'), description: 'Voyage musical autour du globe.' },
  { id: 'pc3', title: 'Beat Makers', host: 'Kodo Beats', cover: img('beatmakers'), description: 'Dans les coulisses de la production.' },
]