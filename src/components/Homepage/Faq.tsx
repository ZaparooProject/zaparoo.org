import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import products from "@site/src/data/products";
import styles from "./Homepage.module.css";

interface FaqItem {
  question: string;
  // Plain text for structured data
  text: string;
  answer: ReactNode;
}

const { appPro: pro, warp } = products;

const faqItems: FaqItem[] = [
  {
    question: "Is Zaparoo free?",
    text: "Yes. Zaparoo Core and the Zaparoo App are free and open source. App Pro and Warp cloud backup are optional.",
    answer: (
      <>
        Yes. Zaparoo Core and the Zaparoo App are free and open source.{" "}
        <Link to={pro.docsUrl}>App Pro</Link> and{" "}
        <Link href={warp.pricingUrl("homepage_faq")}>Warp cloud backup</Link>{" "}
        are optional.
      </>
    ),
  },
  {
    question: "What do I need to get started?",
    text: "Free Zaparoo software on the device that plays your games, an NFC reader, and NFC cards. The setup guide lists what to get for your platform, including options that use QR codes you print yourself.",
    answer: (
      <>
        Free Zaparoo software on the device that plays your games, an NFC
        reader, and NFC cards. The <Link to="/start/">setup guide</Link> lists
        what to get for your platform, including options that use QR codes you
        print yourself.
      </>
    ),
  },
  {
    question: "What does Zaparoo work with?",
    text: "MiSTer FPGA, Batocera, SteamOS, Windows, Linux, and more. Each platform page lists the launchers and readers it supports.",
    answer: (
      <>
        MiSTer FPGA, Batocera, SteamOS, Windows, Linux, and more. Each{" "}
        <Link to="/docs/platforms/">platform page</Link> lists the launchers
        and readers it supports.
      </>
    ),
  },
  {
    question: "Do I need the Zaparoo App?",
    text: "No. You can also manage Core with the built-in Web UI, terminal UI, or command line without installing anything on your phone.",
    answer: (
      <>
        No. You can also manage Core with the built-in{" "}
        <Link to="/docs/app/web/">Web UI</Link>,{" "}
        <Link to="/docs/core/tui/">terminal UI</Link>, or{" "}
        <Link to="/docs/core/cli/">command line</Link> without installing
        anything on your phone.
      </>
    ),
  },
  {
    question: "Can I use Amiibo and other NFC toys?",
    text: "Yes. Amiibo, Skylanders, Disney Infinity, and LEGO Dimensions figures work as tokens. You map each figure to a game instead of writing to it.",
    answer: (
      <>
        Yes. Amiibo, Skylanders, Disney Infinity, and LEGO Dimensions figures
        work as <Link to="/docs/tokens/nfc-toys/">tokens</Link>. You map each
        figure to a game instead of writing to it.
      </>
    ),
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.text },
  })),
};

export default function Faq(): ReactNode {
  return (
    <div className="container">
      <h2 className={styles.sectionTitle}>Common questions</h2>
      <div className={styles.faqList}>
        {faqItems.map((item) => (
          <details key={item.question} className={styles.faqItem}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
