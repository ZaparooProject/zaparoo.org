import {MasonryPhotoAlbum} from "react-photo-album";
import type {Photo} from "react-photo-album";
import "react-photo-album/masonry.css";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import {useState} from "react";
import {Captions} from "yet-another-react-lightbox/plugins";

const allPhotos: Photo[] = [
    {
        src: "/img/showcase/discord1.jpg",
        width: 1200,
        height: 924,
        alt: "NFC cards in custom storage box. Credit: Snaggletooth @ Discord"
    },
    {
        src: "/img/showcase/discord2.jpg",
        width: 900,
        height: 1200,
        alt: "Custom labelled NFC arcade cards. Credit: Roge_NES @ Discord"
    },
    {
        src: "/img/showcase/discord3.jpg",
        width: 900,
        height: 1200,
        alt: "Mega Drive NFC card. Credit: tunnotron3000 @ Discord"
    },
    {
        src: "/img/showcase/discord4.jpg",
        width: 1200,
        height: 900,
        alt: "Custom cover Switch cases with NFC cards. Credit: BigBlue709 @ Discord"
    },
    {
        src: "/img/showcase/discord5.jpg",
        width: 900,
        height: 1200,
        alt: "Magazine QR launch codes. Credit: Elphive @ Discord"
    },
    {
        src: "/img/showcase/discord6.jpg",
        width: 1200,
        height: 903,
        alt: "NFC Gameboy carts with custom sleeves. Credit: Anime0t4ku @ Discord"
    },
    {
        src: "/img/showcase/discord7.jpg",
        width: 1200,
        height: 605,
        alt: "Custom 3D printed NFC carts. Credit: Sandisc @ Discord"
    },
    {src: "/img/showcase/discord8.jpg", width: 900, height: 1200, alt: "NFC Gameboy cart. Credit: Phoenix @ Discord"},
    {
        src: "/img/showcase/discord9.jpg",
        width: 900,
        height: 1200,
        alt: "Full cover NFC cards. Credit: spotUP @ Discord"
    },
    {
        src: "/img/showcase/discord10.jpg",
        width: 1200,
        height: 900,
        alt: "Gameboy NFC cards. Credit: Anime0t4ku @ Discord"
    },
    {
        src: "/img/showcase/discord11.jpg",
        width: 900,
        height: 1200,
        alt: "Custom black and white NFC card labels. Credit: tunnotron3000 @ Discord"
    },
    {
        src: "/img/showcase/discord12.jpg",
        width: 1200,
        height: 458,
        alt: "Cassette case NFC card covers. Credit: stews522 @ Discord"
    },
    {src: "/img/showcase/discord13.jpg", width: 904, height: 1200, alt: "NFC floppy disks. Credit: V1605 @ Discord"},
    {
        src: "/img/showcase/discord14.jpg",
        width: 1200,
        height: 900,
        alt: "Full Zaparoo and MiSTer FPGA setup. Credit: moop @ Discord"
    },
    {src: "/img/showcase/discord15.jpg", width: 1200, height: 900, alt: "PC NFC card. Credit: BigBlue709 @ Discord"},
    {
        src: "/img/showcase/discord16.jpg",
        width: 1200,
        height: 900,
        alt: "Switch case NFC card collection. Credit: BigBlue709 @ Discord"
    },
    {
        src: "/img/showcase/discord17.png",
        width: 903,
        height: 1200,
        alt: "Cassette case with 3D printed NFC card storage. Credit: Phoenix @ Discord"
    },
    {
        src: "/img/showcase/discord18.jpg",
        width: 900,
        height: 1200,
        alt: "Custom NFC card label design. Credit: Phoenix @ Discord"
    },
    {
        src: "/img/showcase/discord19.jpg",
        width: 1200,
        height: 900,
        alt: "Zaparoo arcade cab setup. Credit: zodduska @ Discord"
    },
    {
        src: "/img/showcase/discord20.jpg",
        width: 900,
        height: 1200,
        alt: "Arcade setup with custom NFC reader stand. Credit: Macs @ Discord"
    },
]

export default function Showcase(props: {
    limit: number;
}) {
    const photos = allPhotos.slice(0, props.limit);
    const [index, setIndex] = useState(-1);
    return <div style={{
        padding: "1rem",
        paddingBottom: "2rem",
        paddingTop: "2rem",
        backgroundColor: "var(--ifm-color-emphasis-100)",
        backgroundImage: "url('./img/circuit-board.svg')",
        backgroundRepeat: "repeat",
    }}>
        <div className="text--center padding-horiz--md">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"
                 fill="currentColor"
                 style={{
                     marginBottom: "0.5rem",
                     color: "var(--ifm-color-primary)",
                     width: "50px",
                     height: "50px"
                 }}>
                <path
                    d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
            </svg>
            <Heading as="h2">Community Photos</Heading>
            <p>Check out some of the awesome Zaparoo stuff our community is making!</p>
        </div>
        <MasonryPhotoAlbum photos={photos} onClick={({index}) => setIndex(index)}/>
        <Lightbox
            slides={photos.map(photo => ({
                ...photo,
                description: photo.alt,
            }))}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            plugins={[Captions]}
        />
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
            paddingTop: "2rem",
            paddingBottom: "0",
            gap: "0.5rem",
        }}>
            <div style={{textAlign: "center", fontWeight: "bolder"}}>Looking for more?</div>
            <div className={styles.buttons}>
                <Link
                    className="button button--secondary button--lg"
                    to="/discord"
                    style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                >
                    <img
                        src="/img/discord-logo.svg"
                        alt="Discord logo"
                        height="16px"
                        width="16px"
                        style={{marginRight: "5px"}}
                    />{" "}
                    Join the Discord
                </Link>
            </div>
        </div>
    </div>;
}