import React from 'react';
import styles from './styles.module.css';

interface SponsorCardProps {
  title: string;
  icon?: string;
  description: string;
  link: string;
  linkText: string;
  badge?: string;
  umami?: string;
}

export default function SponsorCard({
  title,
  icon,
  description,
  link,
  linkText,
  badge,
  umami,
}: SponsorCardProps) {
  return (
    <div className="col col--6" style={{ marginBottom: '1.5rem' }}>
      <a
        href={link}
        className={styles.sponsorCard}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event={umami}
      >
        {badge && <div className={styles.badge}>{badge}</div>}
        {icon && <div className={styles.icon}>{icon}</div>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.link}>
          {linkText} →
        </div>
      </a>
    </div>
  );
}
