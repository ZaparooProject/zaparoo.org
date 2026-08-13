import type { ReactNode } from "react";
import DownloadCard from "@site/src/components/DownloadCard";
import {
  downloadablePlatforms,
  type SupportTier,
} from "@site/src/data/platforms";
import styles from "./styles.module.css";

const downloadStatus = (tier: SupportTier) => {
  if (tier === "beta") return "beta" as const;
  return "stable" as const;
};

export default function CoreDownloads(): ReactNode {
  return (
    <div className={styles.grid}>
      {downloadablePlatforms.map((platform) => (
        <DownloadCard
          key={platform.id}
          id={platform.id}
          name={platform.name}
          platform={platform.id}
          architectures={platform.download.architectures}
          defaultArch={platform.download.defaultArchitecture}
          icon={
            <img
              src={platform.icon}
              alt={`${platform.name} logo`}
              style={platform.iconStyle}
            />
          }
          docLink={platform.docsPath}
          platformLink={platform.projectUrl}
          nativeInstall={platform.download.nativeInstall}
          status={downloadStatus(platform.supportTier)}
        />
      ))}
    </div>
  );
}
