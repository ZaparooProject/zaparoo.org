import React, { useState, useEffect } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

interface RotatingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  words,
  interval = 3500,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (words.length <= 1) return;

    if (prefersReducedMotion) {
      // If reduced motion is preferred, still cycle words for screen readers
      // but skip the animation state changes
      const rotationTimer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, interval);
      return () => clearInterval(rotationTimer);
    }

    const rotationTimer = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 200); // Half of the CSS transition time
    }, interval);

    return () => clearInterval(rotationTimer);
  }, [words, interval, prefersReducedMotion]);

  if (words.length === 0) return null;

  // Conditionally apply animation classes
  const animationClasses = prefersReducedMotion ? '' : (isAnimating ? 'fade-out' : 'fade-in');

  return (
    <span className={`rotating-word-container ${className}`}>
      <span
        className={`rotating-word ${animationClasses}`}
        aria-live="polite"
        aria-label={`Currently showing: ${words[currentIndex]}`}
        data-length={words[currentIndex].length}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
};

export default RotatingText;