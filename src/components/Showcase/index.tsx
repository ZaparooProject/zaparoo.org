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
            <Heading as="h2">Community Showcase</Heading>
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
                    to="https://zaparoo.org/discord"
                    style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                >
                    <img
                        src="./img/discord-logo.svg"
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