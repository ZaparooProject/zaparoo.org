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
    title: "Make Media Real",
    Svg: require("@site/static/img/hand-metal.svg").default,
    description: (
      <>
        Add back a tactile feel to your digital media! Use physical objects to
        launch media with affordable hardware like NFC tags and QR codes.
      </>
    ),
  },
  {
    title: "Make Media Accessible",
    Svg: require("@site/static/img/heart.svg").default,
    description: (
      <>
        Make it easy for family & friends to play their favorite games, stop
        struggling with choice paralysis, set the perfect rotation for
        tournaments.
      </>
    ),
  },
  {
    title: "Make Media Do Stuff",
    Svg: require("@site/static/img/waypoints.svg").default,
    description: (
      <>
        A platform for integrating with your media. Trigger custom actions,
        subscribe to events or create your own applications using Zaparoo as a
        backend.
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
