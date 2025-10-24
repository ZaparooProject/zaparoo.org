import { MasonryPhotoAlbum, RowsPhotoAlbum } from "react-photo-album";
import type { Photo } from "react-photo-album";
import "react-photo-album/masonry.css";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useState } from "react";
import { Captions } from "yet-another-react-lightbox/plugins";

interface FeaturedPhoto extends Photo {
  featured?: boolean;
}

const allPhotos: FeaturedPhoto[] = [
  {
    src: "/img/showcase/brogasaurusrex_custom_mister_build.webp",
    width: 1200,
    height: 900,
    alt: "Custom MiSTer build. Credit: brogasaurusrex @ Discord",
  },
  {
    src: "/img/showcase/tycal_custom_tv_cart_build.webp",
    width: 1112,
    height: 1200,
    alt: "Custom TV cart build. Credit: tycal @ Discord",
    featured: true,
  },
  {
    src: "/img/showcase/xtal_vinyl_sticker_cards.webp",
    width: 900,
    height: 1200,
    alt: "Vinyl sticker cards. Credit: xtal @ Discord",
  },
  {
    src: "/img/showcase/tunnotron3000_gekisha_boy.webp",
    width: 900,
    height: 1200,
    alt: "Gekisha Boy NFC card. Credit: tunnotron3000 @ Discord",
  },
  {
    src: "/img/showcase/tunnotron3000_bubsy.webp",
    width: 900,
    height: 1200,
    alt: "Bubsy NFC card. Credit: tunnotron3000 @ Discord",
    featured: true,
  },
  {
    src: "/img/showcase/flexbone_arcade.webp",
    width: 1200,
    height: 904,
    alt: "Arcade setup with NFC cards. Credit: flexbone @ Discord",
  },
  {
    src: "/img/showcase/conehead_stacks.webp",
    width: 1200,
    height: 906,
    alt: "Stacked NFC card collection. Credit: conehead @ Discord",
  },
  {
    src: "/img/showcase/Zag_steam.webp",
    width: 1048,
    height: 1200,
    alt: "Steam Deck NFC card. Credit: Zag @ Discord",
  },
  {
    src: "/img/showcase/Turbotobi79_zelda.webp",
    width: 560,
    height: 1200,
    alt: "Legend of Zelda NFC card. Credit: Turbotobi79 @ Discord",
  },
  {
    src: "/img/showcase/MechaRebecca_cassette_cases.webp",
    width: 1200,
    height: 606,
    alt: "Cassette case NFC card storage. Credit: MechaRebecca @ Discord",
  },
  {
    src: "/img/showcase/MSouza3D_custom_reader.webp",
    width: 675,
    height: 1200,
    alt: "Custom 3D printed NFC reader. Credit: MSouza3D @ Discord",
    featured: true,
  },
  {
    src: "/img/showcase/LoVeMaKeRz_psx_mini.webp",
    width: 1200,
    height: 900,
    alt: "3D printed mini PlayStation console and discs. Credit: LoVeMaKeRz @ Discord",
    featured: true,
  },
  {
    src: "/img/showcase/LoVeMaKeRz_paprium.webp",
    width: 1200,
    height: 900,
    alt: "Paprium NFC cart. Credit: LoVeMaKeRz @ Discord",
  },
  {
    src: "/img/showcase/BigBlue709_tgfx.webp",
    width: 900,
    height: 1200,
    alt: "TurboGrafx-16 NFC cards. Credit: BigBlue709 @ Discord",
  },
  {
    src: "/img/showcase/Anime0t4ku_genesis.webp",
    width: 1200,
    height: 672,
    alt: "Sega Genesis NFC cards. Credit: Anime0t4ku @ Discord",
  },
  {
    src: "/img/showcase/Anime0t4ku_gb_cart.webp",
    width: 961,
    height: 1200,
    alt: "Game Boy NFC cart with custom label. Credit: Anime0t4ku @ Discord",
  },
  {
    src: "/img/showcase/bten_floppy.webp",
    width: 1167,
    height: 768,
    alt: "MiSTer with floppy NFC setup. Credit: bten @ Discord",
  },
  {
    src: "/img/showcase/Anime0t4ku_movie_cards.webp",
    width: 1110,
    height: 839,
    alt: "NFC movie cards. Credit: Anime0t4ku @ Discord",
  },
  {
    src: "/img/showcase/LoVeMaKeRz_mini_neogeo.webp",
    width: 1200,
    height: 901,
    alt: "3D printed mini NeoGeo console and carts. Credit: LoVeMaKeRz @ Discord",
  },
  {
    src: "/img/showcase/BFOOT_mini_nes_2.webp",
    width: 1200,
    height: 675,
    alt: "3D printed mini NES close up. Credit: BFOOT @ Discord",
  },
  {
    src: "/img/showcase/AngelHalo_mister.webp",
    width: 541,
    height: 1200,
    alt: "MiSTer setup with reader. Credit: AngelHalo @ Discord",
  },
  {
    src: "/img/showcase/BFOOT_mini_nes_1.webp",
    width: 900,
    height: 1200,
    alt: "3D printed mini NES booth. Credit: BFOOT @ Discord",
  },
  {
    src: "/img/showcase/BigBlue709_switch_case.webp",
    width: 1200,
    height: 900,
    alt: "Switch cases for storing NFC cards. Credit: BigBlue709 @ Discord",
  },
  {
    src: "/img/showcase/PIXEL_Memories_nfc_stick.webp",
    width: 1200,
    height: 1120,
    alt: "Arcade stick with built-in NFC reader. Credit: PIXEL Memories @ Discord",
  },
  {
    src: "/img/showcase/lovemakerz_mini_snes.webp",
    width: 1200,
    height: 900,
    alt: "3D printed mini SNES carts. Credit: LoVeMaKeRz @ Discord",
  },
  {
    src: "/img/showcase/discord1.webp",
    width: 1200,
    height: 924,
    alt: "NFC cards in custom storage box. Credit: Snaggletooth @ Discord",
  },
  {
    src: "/img/showcase/discord2.webp",
    width: 900,
    height: 1200,
    alt: "Custom labelled NFC arcade cards. Credit: Roge_NES @ Discord",
  },
  {
    src: "/img/showcase/discord3.webp",
    width: 900,
    height: 1200,
    alt: "Mega Drive NFC card. Credit: tunnotron3000 @ Discord",
  },
  {
    src: "/img/showcase/discord4.webp",
    width: 1200,
    height: 900,
    alt: "Custom cover Switch cases with NFC cards. Credit: BigBlue709 @ Discord",
  },
  {
    src: "/img/showcase/discord5.webp",
    width: 900,
    height: 1200,
    alt: "Magazine QR launch codes. Credit: Elphive @ Discord",
  },
  {
    src: "/img/showcase/discord6.webp",
    width: 1200,
    height: 903,
    alt: "NFC Gameboy carts with custom sleeves. Credit: Anime0t4ku @ Discord",
  },
  {
    src: "/img/showcase/discord7.webp",
    width: 1200,
    height: 605,
    alt: "Custom 3D printed NFC carts. Credit: Sandisc @ Discord",
  },
  {
    src: "/img/showcase/discord8.webp",
    width: 900,
    height: 1200,
    alt: "NFC Gameboy cart. Credit: Phoenix @ Discord",
  },
  {
    src: "/img/showcase/discord9.webp",
    width: 900,
    height: 1200,
    alt: "Full cover NFC cards. Credit: spotUP @ Discord",
  },
  {
    src: "/img/showcase/discord10.webp",
    width: 1200,
    height: 900,
    alt: "Gameboy NFC cards. Credit: Anime0t4ku @ Discord",
  },
  {
    src: "/img/showcase/discord11.webp",
    width: 900,
    height: 1200,
    alt: "Custom black and white NFC card labels. Credit: tunnotron3000 @ Discord",
  },
  {
    src: "/img/showcase/discord12.webp",
    width: 1200,
    height: 458,
    alt: "Cassette case NFC card covers. Credit: stews522 @ Discord",
  },
  {
    src: "/img/showcase/discord13.webp",
    width: 904,
    height: 1200,
    alt: "NFC floppy disks. Credit: V1605 @ Discord",
  },
  {
    src: "/img/showcase/discord14.webp",
    width: 1200,
    height: 900,
    alt: "Full Zaparoo and MiSTer FPGA setup. Credit: moop @ Discord",
  },
  {
    src: "/img/showcase/discord15.webp",
    width: 1200,
    height: 900,
    alt: "PC NFC card. Credit: BigBlue709 @ Discord",
  },
  {
    src: "/img/showcase/discord16.webp",
    width: 1200,
    height: 900,
    alt: "Switch case NFC card collection. Credit: BigBlue709 @ Discord",
  },
  {
    src: "/img/showcase/discord17.webp",
    width: 903,
    height: 1200,
    alt: "Cassette case with 3D printed NFC card storage. Credit: Phoenix @ Discord",
  },
  {
    src: "/img/showcase/discord18.webp",
    width: 900,
    height: 1200,
    alt: "Custom NFC card label design. Credit: Phoenix @ Discord",
  },
  {
    src: "/img/showcase/discord19.webp",
    width: 1200,
    height: 900,
    alt: "Zaparoo arcade cab setup. Credit: zodduska @ Discord",
  },
  {
    src: "/img/showcase/discord20.webp",
    width: 900,
    height: 1200,
    alt: "Arcade setup with custom NFC reader stand. Credit: Macs @ Discord",
  },
];

export default function Showcase(props: {
  limit?: number;
  featured?: boolean;
}) {
  let photos = allPhotos;

  if (props.featured) {
    photos = allPhotos.filter((photo) => photo.featured);
  }

  if (props.limit) {
    photos = photos.slice(0, props.limit);
  }

  const [index, setIndex] = useState(-1);

  const PhotoAlbum = props.featured ? RowsPhotoAlbum : MasonryPhotoAlbum;
  const albumProps = props.featured
    ? {
        targetRowHeight: 200,
        rowConstraints: { singleRowMaxHeight: 300 },
      }
    : {};

  return (
    <>
      <PhotoAlbum
        photos={photos}
        onClick={({ index }) => setIndex(index)}
        componentsProps={{
          image: { loading: "lazy" },
        }}
        {...albumProps}
      />
      <Lightbox
        slides={photos.map((photo) => ({
          ...photo,
          description: photo.alt,
        }))}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions]}
      />
    </>
  );
}
