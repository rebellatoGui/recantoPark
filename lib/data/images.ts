function unsplash(id: string, width = 1600, height = 1200) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
}

export const heroImages = {
  main: unsplash("1610641818989-c2051b5e2cfd", 2400, 1500),
};

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

export const parkImages = [
  unsplash("1704925052388-070244d29a3a"),
  unsplash("1621445944472-f252571005b6"),
  unsplash("1713426225330-014fbfd04aa0"),
  unsplash("1613546167482-b3280d75f796"),
];

export const breakfastImages = [
  unsplash("1596701062351-8c2c14d1fdd0"),
  unsplash("1540304453527-62f979142a17"),
  unsplash("1630582837298-49d1927726e5"),
];

export const galleryImages = [
  poolImages[0],
  beachImages[0],
  roomImages[0],
  parkImages[0],
  breakfastImages[0],
  poolImages[1],
  beachImages[1],
  roomImages[2],
  parkImages[1],
  beachImages[2],
];
