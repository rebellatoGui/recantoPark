"""Reexporta as fotos de new_assets/ (originais, fora do git) para public/photos/.

O next/image gera AVIF/WebP responsivos a partir destes arquivos, então aqui
guardamos a maior qualidade útil do original.
"""
from pathlib import Path

from PIL import Image

SRC, DST = Path("new_assets"), Path("public/photos")
MAX_SIDE = 2400
MAP = {
    "estacionamento.png": "estacionamento.webp",
    "quarto1.jpeg": "quarto1.webp",
    "quarto2.jpeg": "quarto2.webp",
    "banheiro1.jpeg": "banheiro1.webp",
    "acesso-a-praia.jpg": "acesso-a-praia.webp",
    "cachorro-praia.webp": "cachorro-praia.webp",
    "mar-gravata.webp": "praia-gravata-mar.webp",
    "pedras-na-beira-da-praia.jpg": "praia-gravata-pedras.webp",
    "o-mar-tomando-conta.jpg": "o-mar.webp",
    "google-maps.png": "google-maps.webp",
    "beto-carrero-world.png": "beto-carrero-world.webp",
    "beto-carrero-world-parque.png": "beto-carrero-world-parque.webp",
    "Star-Mountain-Beto-Carrero-World-2.jpg": "atracoes/star-mountain.webp",
    "brinquedo-big-drop-beto-carrero.jpg": "atracoes/big-drop.webp",
    "fire-whip-montanha-russa-beto-carrero-1-740x897.jpg": "atracoes/fire-whip.webp",
    "hot-wheels-epic-show.jpg": "atracoes/hot-wheels-epic-show.webp",
    "madagascar.jpg": "atracoes/madagascar-crazy-river.webp",
    "portal-escuridao.jpg": "atracoes/portal-escuridao.webp",
    "tchibum.jpg": "atracoes/tchibum.webp",
}

for src, dst in MAP.items():
    image = Image.open(SRC / src).convert("RGB")
    image.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    image.save(DST / dst, "WEBP", quality=92, method=6)
    print(f"{dst}: {image.size[0]}x{image.size[1]}, {(DST / dst).stat().st_size // 1024} KB")
