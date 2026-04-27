import React from 'react';
import Link from '@docusaurus/Link';
import ProductLink from '@site/src/components/ProductLink';
import styles from './styles.module.css';

interface Props {
  variant?: 'sponsor' | 'combined';
}

export default function SponsorCallout({ variant = 'sponsor' }: Props) {
  if (variant === 'combined') {
    return (
      <div className={styles.combined}>
        <p className={styles.combinedHeadline}>Enjoying this release? Three ways to support Zaparoo's development.</p>
        <div className={styles.combinedButtons}>
          <a
            href="https://zaparoo.app"
            className={styles.combinedButton}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="release-callout-app"
          >
            Get the App
          </a>
          <ProductLink
            href="https://shop.zaparoo.com"
            store="shop"
            className={styles.combinedButton}
            unstyled
            showIcon={false}
          >
            Visit the Shop
          </ProductLink>
          <Link
            to="/sponsor/"
            className={styles.combinedButton}
            data-umami-event="release-callout-sponsor"
          >
            Sponsor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sponsor}>
      Zaparoo is free and open source. If it's made your setup better,{' '}
      <Link to="/sponsor/">supporting the project</Link> helps fund continued
      development.
    </div>
  );
}
