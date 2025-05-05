import {RowsPhotoAlbum, Photo} from "react-photo-album";
import "react-photo-album/rows.css";
import {useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import {Captions} from "yet-another-react-lightbox/plugins";

export default function Gallery(props: { photos: Photo[] }) {
    const [index, setIndex] = useState(-1);
    return (
        <>
            <RowsPhotoAlbum
                photos={props.photos}
                onClick={({ index }) => setIndex(index)}
                targetRowHeight={150}
                rowConstraints={{ singleRowMaxHeight: 250 }}
            />
            <Lightbox
                slides={props.photos.map((photo) => ({
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