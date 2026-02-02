import { RowsPhotoAlbum } from "react-photo-album";
import type { Photo, RenderImageProps } from "react-photo-album";
import "react-photo-album/rows.css";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Captions, Video } from "yet-another-react-lightbox/plugins";
import styles from "./styles.module.css";

export interface GalleryPhoto {
  type?: "photo";
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface GalleryVideo {
  type: "video";
  poster: string;
  width: number;
  height: number;
  src: string;
  alt?: string;
}

export type GalleryItem = GalleryPhoto | GalleryVideo;

export default function Gallery(props: {
  media?: GalleryItem[];
  photos?: Photo[]; // backwards compatibility
  captions?: boolean;
}) {
  const [index, setIndex] = useState(-1);

  // Support both 'media' and legacy 'photos' prop
  const mediaItems: GalleryItem[] = props.media || props.photos || [];

  // Track which sources are videos (by poster URL)
  const videoPosterUrls = new Set(
    mediaItems
      .filter((item): item is GalleryVideo => item.type === "video")
      .map((item) => item.poster)
  );

  // For the photo album grid, use poster images for videos
  const photos: Photo[] = mediaItems.map((item) => ({
    src: item.type === "video" ? item.poster : item.src,
    width: item.width,
    height: item.height,
    alt: item.alt,
  }));

  // For the lightbox, map to correct slide types
  const slides = mediaItems.map((item) => {
    if (item.type === "video") {
      return {
        type: "video" as const,
        poster: item.poster,
        width: item.width,
        height: item.height,
        sources: [{ src: item.src, type: "video/mp4" }],
        description: item.alt,
      };
    }
    return {
      src: item.src,
      width: item.width,
      height: item.height,
      description: item.alt,
    };
  });

  const renderImage = ({ alt, src, ...restProps }: RenderImageProps) => {
    const isVideo = videoPosterUrls.has(src);
    if (isVideo) {
      return (
        <div className={styles.videoContainer}>
          <img alt={alt} src={src} {...restProps} />
          <div className={styles.playButton} />
        </div>
      );
    }
    return <img alt={alt} src={src} {...restProps} />;
  };

  return (
    <>
      <div className={styles.gallery}>
        <RowsPhotoAlbum
          photos={photos}
          onClick={({ index }) => setIndex(index)}
          targetRowHeight={150}
          rowConstraints={{ singleRowMaxHeight: 250 }}
          render={{ image: renderImage }}
        />
      </div>
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={props.captions !== false ? [Captions, Video] : [Video]}
        video={{ autoPlay: true }}
      />
    </>
  );
}
