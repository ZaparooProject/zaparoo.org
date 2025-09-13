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
        Tap a card, launch a game. No scrolling through menus, no loading screens,
        no complexity. Just pure gaming magic that works in seconds.
      </>
    ),
  },
  {
    title: "Zero Hardware Modification",
    Svg: require("@site/static/img/heart.svg").default,
    description: (
      <>
        Works with your existing devices without any modifications. Start with
        just your phone and some NFC cards - no soldering, no special hardware required.
      </>
    ),
  },
  {
    title: "Universal Platform Support",
    Svg: require("@site/static/img/waypoints.svg").default,
    description: (
      <>
        One system works everywhere: MiSTer FPGA, Steam Deck, RetroPie, Windows,
        and more. Set up once, use everywhere with your entire game collection.
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
