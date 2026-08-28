import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import { ArrowRight, CircleCheck, FlaskConical } from "lucide-react";
import coreRelease, { formatReleaseDate } from "@site/src/data/coreRelease";
import { supportTierDetails } from "@site/src/data/platforms";
import styles from "./styles.module.css";

const formattedReleaseDate = formatReleaseDate(coreRelease.releaseDate);

export default function CoreReleaseBar(): ReactNode {
  return (
    <aside className={styles.release} aria-label="Zaparoo Core release and support levels">
      <div className={styles.details}>
        <strong>Zaparoo Core v{coreRelease.version}</strong>
        <span aria-hidden="true">·</span>
        <span>{formattedReleaseDate}</span>
      </div>

      <div className={styles.legend} aria-label="Platform support levels">
        <span title={supportTierDetails.stable.description}>
          <CircleCheck size={18} aria-hidden="true" data-tier="stable" />
          Stable
        </span>
        <span title={supportTierDetails.beta.description}>
          <FlaskConical size={18} aria-hidden="true" data-tier="beta" />
          Beta
        </span>
      </div>

      <Link
        to={coreRelease.blogPost}
        className={styles.link}
        data-umami-event="downloads-release-notes"
      >
        Release notes <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </aside>
  );
}
