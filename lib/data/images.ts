function unsplash(id: string, width = 1600, height = 1200) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
}

// Fotografia real da pousada, do Beto Carrero e da Praia do Gravatá.
// Otimizadas em public/photos/*.webp (fonte em new_assets/, fora do repo).
export const photos = {
  betoCarreroHero: "/photos/beto-carrero-world-parque.webp",
  betoCarrero: "/photos/beto-carrero-world.webp",
  googleMaps: "/photos/google-maps.webp",
  gravataPedras: "/photos/praia-gravata-pedras.webp",
  gravataMar: "/photos/praia-gravata-mar.webp",
  acessoPraia: "/photos/acesso-a-praia.webp",
  cachorroPraia: "/photos/cachorro-praia.webp",
  oMar: "/photos/o-mar.webp",
  entrada: "/photos/entrada.webp",
  estacionamento: "/photos/estacionamento.webp",
  quarto1: "/photos/quarto1.webp",
  quarto2: "/photos/quarto2.webp",
  banheiro1: "/photos/banheiro1.webp",
  droneGravata: "/photos/drone-gravata.mp4",
  droneGravataPoster: "/photos/drone-gravata-poster.webp",
  droneGravata2: "/photos/drone-gravata-2.mp4",
  droneGravata2Poster: "/photos/drone-gravata-2-poster.webp",
  heroVideo: "/photos/hero-beto-carrero.mp4",
  heroVideoPoster: "/photos/hero-beto-carrero-poster.webp",
} as const;

// Banco de imagens (Unsplash) para os serviços que ainda não têm foto própria
// da pousada. Trocar por fotografia real assim que houver.
export const amenityStock = {
  breakfast: unsplash("1504754524776-8f4f37790ca0", 600, 600),
  ac: unsplash("1762341123870-d706f257a12e", 600, 600),
  minibar: unsplash("1540961403310-79825242906e", 600, 600),
  wifi: unsplash("1453928582365-b6ad33cbcf64", 600, 600),
  accessibility: unsplash("1656646523834-dd1cc57d33c9", 600, 600),
  tv: unsplash("1595935736128-db1f0a261263", 600, 600),
  petFriendly: unsplash("1698949654875-544ecfef27ac", 600, 600),
} as const;

export const poolImages = [
  unsplash("1623718649591-311775a30c43"),
  unsplash("1582719508461-905c673771fd"),
  unsplash("1584132967334-10e028bd69f7"),
  unsplash("1563911302283-d2bc129e7570"),
];

export const beachImages = [
  unsplash("1533760881669-80db4d7b4c15"),
  unsplash("1519046904884-53103b34b206"),
  unsplash("1507525428034-b723cf961d3e"),
  unsplash("1520454974749-611b7248ffdb"),
];

export const roomImages = [
  unsplash("1618773928121-c32242e63f39"),
  unsplash("1611892440504-42a792e24d32"),
  unsplash("1629140727571-9b5c6f6267b4"),
  unsplash("1631049307264-da0ec9d70304"),
  unsplash("1566665797739-1674de7a421a"),
  unsplash("1631049552057-403cdb8f0658"),
  unsplash("1568495248636-6432b97bd949"),
  unsplash("1562438668-bcf0ca6578f0"),
  unsplash("1576354302919-96748cb8299e"),
  unsplash("1445991842772-097fea258e7b"),
  unsplash("1634072319894-107e61606191"),
  unsplash("1647792855184-af42f1720b91"),
  unsplash("1698927100805-2a32718a7e05"),
  unsplash("1649369365908-a0d1225e0b05"),
  unsplash("1548612486-94d786319018"),
  unsplash("1616594039964-ae9021a400a0"),
  unsplash("1615874959474-d609969a20ed"),
  unsplash("1616047006789-b7af5afb8c20"),
  unsplash("1616486029423-aaa4789e8c9a"),
  unsplash("1586023492125-27b2c045efd7"),
];


// Carrossel da Praia do Gravatá (seção Localização) — fotografia real.
export const gravataCarousel: { src: string; alt: string }[] = [
  { src: photos.gravataPedras, alt: "Costão de pedras e o mar na Praia do Gravatá" },
  { src: photos.oMar, alt: "Mar aberto visto da Praia do Gravatá" },
  { src: photos.cachorroPraia, alt: "Cachorro passeando na areia da praia" },
  { src: photos.acessoPraia, alt: "Passarela de acesso à praia entre a vegetação" },
  { src: photos.gravataMar, alt: "Ondas quebrando na Praia do Gravatá" },
];
