import { useEffect, useRef, useState, type ReactNode } from "react";
import { Trophy } from "lucide-react";
import clsx from "clsx";
import styles from "./styles.module.css";

const CONFETTI_COLORS = ["#f5c542", "#ffde7a", "#632aa3", "#813dcd", "#54b2ff", "#ff7eb6"];
const PARTICLE_COUNT = 110;
const DURATION_MS = 2600;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  round: boolean;
};

// Draws one burst on a temporary full-viewport canvas and returns a cleanup
// that stops the animation early (used on unmount).
function burst(origin: DOMRect): () => void {
  const canvas = document.createElement("canvas");
  canvas.className = styles.confettiCanvas;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return () => {};
  }

  const dpr = window.devicePixelRatio || 1;
  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
  };
  resize();
  window.addEventListener("resize", resize);

  const startX = origin.left + origin.height / 2;
  const startY = origin.top + origin.height / 2;
  const startScroll = window.scrollY;
  const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
    const speed = 7 + Math.random() * 9;
    return {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 6,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.4,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      round: Math.random() < 0.3,
    };
  });

  let frame = 0;
  const start = performance.now();
  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };

  const tick = (now: number) => {
    const elapsed = now - start;
    if (elapsed > DURATION_MS) {
      stop();
      return;
    }
    // Keep the burst attached to the page if the reader keeps scrolling.
    const scrollOffset = startScroll - window.scrollY;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.globalAlpha = Math.min(1, (DURATION_MS - elapsed) / 600);
    for (const p of particles) {
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 + 0.28;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y + scrollOffset);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Scale on one axis so the strips appear to flutter.
        ctx.scale(1, Math.cos(p.rotation * 2));
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return stop;
}

export default function FeaturedPick(): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let stopBurst: (() => void) | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setFired(true);
          stopBurst = burst(el.getBoundingClientRect());
        }
      },
      // Fire once the badge reaches the upper part of the screen, when the
      // reader has moved on from the previous section.
      { threshold: 1, rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stopBurst?.();
    };
  }, []);

  return (
    <div ref={ref} className={clsx(styles.badge, fired && styles.fired)}>
      <span className={styles.icon}>
        <Trophy size={22} strokeWidth={2} aria-hidden="true" />
      </span>
      <span className={styles.label}>Featured pick</span>
    </div>
  );
}
