import { useRef, useState } from "react";
import styles from "./DemoVideo.module.css";

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <figure className={styles.figure}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/zaparoo-demo-poster.jpg"
          aria-label="Demonstration of Zaparoo in action: tapping an NFC card to instantly launch a game"
          preload="metadata"
          className={styles.video}
        >
          <source src="/videos/zaparoo-demo.webm" type="video/webm" />
          <source src="/videos/zaparoo-demo.mp4" type="video/mp4" />
        </video>
        <button
          type="button"
          aria-label={playing ? "Pause video" : "Play video"}
          className={styles.toggle}
          onClick={toggle}
        >
          {playing ? (
            <svg fill="currentColor" viewBox="0 0 24 24" className={styles.icon}>
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg fill="currentColor" viewBox="0 0 24 24" className={styles.icon}>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
      <figcaption className={styles.caption}>
        Using NFC cards to launch games on Batocera.
      </figcaption>
    </figure>
  );
}
