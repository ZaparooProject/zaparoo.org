import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Instant Game Launching",
    Svg: require("@site/static/img/hand-metal.svg").default,
    description: (
      <>
        Tap a card and launch a game without digging through menus. Zaparoo
        keeps the setup physical, quick, and ready to show off.
      </>
    ),
  },
  {
    title: "Zero Hardware Modification",
    Svg: require("@site/static/img/heart.svg").default,
    description: (
      <>
        Works with your existing devices without hardware mods. You can start
        with your phone and NFC cards, then add dedicated readers when you want.
      </>
    ),
  },
  {
    title: "Universal Platform Support",
    Svg: require("@site/static/img/waypoints.svg").default,
    description: (
      <>
        Use the same tokens across supported setups like MiSTer FPGA, Steam Deck,
        Windows, Linux, and more.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" style={{color: "var(--ifm-color-primary)"}} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h2">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
