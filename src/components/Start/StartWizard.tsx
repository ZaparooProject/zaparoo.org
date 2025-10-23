import React, { useState, useEffect } from "react";
import {
  CreditCard,
  QrCode,
  Gamepad2,
  Disc,
  Usb,
  Smartphone,
  Camera,
  Download,
  ShoppingCart,
  Book,
  MessageCircle,
  AlertTriangle,
  Info,
  SmartphoneNfc,
  PersonStanding,
} from "lucide-react";
import Link from "@docusaurus/Link";
import styles from "./StartWizard.module.css";

type Platform =
  | "mister"
  | "batocera"
  | "windows"
  | "steamos"
  | "libreelec"
  | null;
type Token = "nfc-cards" | "qr-codes" | "amiibo" | "optical" | null;
type Reader =
  | "usb-nfc-reader"
  | "zaparoo-app"
  | "phone-camera"
  | "optical-drive"
  | null;

interface Choice {
  platform: Platform;
  token: Token;
  reader: Reader;
}

// Capability system for defining relationships
const CAPABILITIES = {
  // Platform capabilities (what hardware/features a platform has)
  OPTICAL_DRIVE: "optical_drive",
  USB_PORT: "usb_port",
  NETWORK: "network",

  // Token types (what kind of token it is)
  NFC_TAG: "nfc_tag",
  QR_CODE: "qr_code",
  PHYSICAL_MEDIA: "physical_media",
} as const;

type Capability = (typeof CAPABILITIES)[keyof typeof CAPABILITIES];

interface PlatformConfig {
  id: NonNullable<Platform>;
  name: string;
  icon: string;
  iconStyle: React.CSSProperties;
  provides: Capability[]; // What capabilities this platform offers
}

interface TokenConfig {
  id: NonNullable<Token>;
  name: string;
  icon: React.ComponentType<{ size?: number | string }>;
  description: string;
  requires: Capability[]; // What this token needs from a platform
  provides: Capability[]; // What this token offers to readers
}

interface ReaderConfig {
  id: NonNullable<Reader>;
  name: string;
  icon: React.ComponentType<{ size?: number | string }>;
  description: string;
  requires: Capability[]; // What this reader needs from a token
}

const platforms: PlatformConfig[] = [
  {
    id: "mister",
    name: "MiSTer FPGA",
    icon: "/img/logos/mister.svg",
    iconStyle: { width: "75px", height: "75px" },
    provides: [
      CAPABILITIES.OPTICAL_DRIVE,
      CAPABILITIES.USB_PORT,
      CAPABILITIES.NETWORK,
    ],
  },
  {
    id: "batocera",
    name: "Batocera",
    icon: "/img/logos/batocera.png",
    iconStyle: { width: "75px", height: "73.83px" },
    provides: [
      CAPABILITIES.OPTICAL_DRIVE,
      CAPABILITIES.USB_PORT,
      CAPABILITIES.NETWORK,
    ],
  },
  {
    id: "windows",
    name: "Windows",
    icon: "/img/logos/windows.svg",
    iconStyle: { width: "75px", height: "75px" },
    provides: [CAPABILITIES.USB_PORT, CAPABILITIES.NETWORK],
  },
  {
    id: "steamos",
    name: "SteamOS",
    icon: "/img/logos/steamos.svg",
    iconStyle: {
      width: "125px",
      height: "33.33px",
      backgroundColor: "white",
      borderRadius: "5px",
    },
    provides: [
      CAPABILITIES.OPTICAL_DRIVE,
      CAPABILITIES.USB_PORT,
      CAPABILITIES.NETWORK,
    ],
  },
  {
    id: "libreelec",
    name: "LibreELEC",
    icon: "/img/logos/libreelec.png",
    iconStyle: { width: "75px", height: "75px", borderRadius: "10%" },
    provides: [
      CAPABILITIES.OPTICAL_DRIVE,
      CAPABILITIES.USB_PORT,
      CAPABILITIES.NETWORK,
    ],
  },
];

const tokens: TokenConfig[] = [
  {
    id: "nfc-cards",
    name: "NFC Tags",
    icon: SmartphoneNfc,
    description: "NFC cards, stickers, etc.",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.NFC_TAG],
  },
  {
    id: "qr-codes",
    name: "QR Codes",
    icon: QrCode,
    description: "Generate and print",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.QR_CODE],
  },
  {
    id: "amiibo",
    name: "NFC Toys",
    icon: PersonStanding,
    description: "Reuse your Amiibos",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.NFC_TAG],
  },
  {
    id: "optical",
    name: "Optical Discs",
    icon: Disc,
    description: "CDs, DVDs or Blu-rays",
    requires: [CAPABILITIES.OPTICAL_DRIVE], // Only platforms with optical drives
    provides: [CAPABILITIES.PHYSICAL_MEDIA],
  },
];

const readers: ReaderConfig[] = [
  {
    id: "usb-nfc-reader",
    name: "USB NFC Reader",
    icon: Usb,
    description: "Plug and play",
    requires: [CAPABILITIES.NFC_TAG],
  },
  {
    id: "zaparoo-app",
    name: "Zaparoo App",
    icon: Smartphone,
    description: "Easiest setup",
    requires: [CAPABILITIES.NFC_TAG, CAPABILITIES.QR_CODE],
  },
  {
    id: "phone-camera",
    name: "Phone Camera",
    icon: Camera,
    description: "Built-in QR scanner",
    requires: [CAPABILITIES.QR_CODE],
  },
  {
    id: "optical-drive",
    name: "Optical Drive",
    icon: Disc,
    description: "USB or internal drive",
    requires: [CAPABILITIES.PHYSICAL_MEDIA],
  },
];

// Generic capability matching helper
function hasAllCapabilities(
  required: Capability[],
  provided: Capability[]
): boolean {
  if (required.length === 0) return true;
  return required.every((req) => provided.includes(req));
}

// Filter tokens by platform capabilities
function getValidTokens(platform: PlatformConfig): TokenConfig[] {
  return tokens.filter((token) =>
    hasAllCapabilities(token.requires, platform.provides)
  );
}

// Filter readers by token capabilities
// A reader is valid if it can read ANY of the token's capabilities
function getValidReaders(token: TokenConfig): ReaderConfig[] {
  return readers.filter((reader) =>
    reader.requires.some((req) => token.provides.includes(req))
  );
}

export const StartWizard: React.FC = () => {
  const [choice, setChoice] = useState<Choice>({
    platform: null,
    token: null,
    reader: null,
  });

  const tokenSectionRef = React.useRef<HTMLElement>(null);
  const readerSectionRef = React.useRef<HTMLElement>(null);
  const summarySectionRef = React.useRef<HTMLElement>(null);

  // Parse URL fragment on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    try {
      const decoded = atob(hash);
      const params = new URLSearchParams(decoded);
      const platform = params.get("platform") as Platform;
      const token = params.get("token") as Token;
      const reader = params.get("reader") as Reader;

      // Validate platform
      const validPlatform = platforms.find((p) => p.id === platform);
      if (validPlatform) {
        setChoice({ platform, token, reader });
      }
    } catch (e) {
      // Invalid hash, ignore
    }
  }, []);

  // Update URL fragment when choices change
  useEffect(() => {
    if (!choice.platform && !choice.token && !choice.reader) {
      // Clear fragment if no choices
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
      }
      return;
    }

    const params = new URLSearchParams();
    if (choice.platform) params.set("platform", choice.platform);
    if (choice.token) params.set("token", choice.token);
    if (choice.reader) params.set("reader", choice.reader);

    const encoded = btoa(params.toString());
    const newHash = `#${encoded}`;
    if (window.location.hash !== newHash) {
      history.replaceState(null, "", `${window.location.pathname}${newHash}`);
    }
  }, [choice]);

  // Auto-scroll to next section when platform is selected
  useEffect(() => {
    if (choice.platform && tokenSectionRef.current) {
      setTimeout(() => {
        tokenSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [choice.platform]);

  // Auto-scroll to reader section when token is selected
  useEffect(() => {
    if (choice.token && readerSectionRef.current) {
      setTimeout(() => {
        readerSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [choice.token]);

  // Auto-scroll to summary when reader is selected
  useEffect(() => {
    if (choice.reader && summarySectionRef.current) {
      setTimeout(() => {
        summarySectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [choice.reader]);

  const updateChoice = (updates: Partial<Choice>) => {
    const newChoice = { ...choice, ...updates };
    setChoice(newChoice);
  };

  const selectedPlatform = platforms.find((p) => p.id === choice.platform);
  const selectedToken = tokens.find((t) => t.id === choice.token);

  return (
    <div id="start-wizard" className={styles.wizard}>
      {/* Step 1: Platform */}
      <section className={styles.step}>
        <h2 className={styles.stepTitle}>Pick a Platform</h2>
        <div className={styles.grid}>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              className={`${styles.card} ${
                choice.platform === platform.id ? styles.active : ""
              }`}
              onClick={() =>
                updateChoice({
                  platform: platform.id,
                  token: null,
                  reader: null,
                })
              }
            >
              <div className={styles.icon}>
                <img
                  src={platform.icon}
                  alt={`${platform.name} logo`}
                  style={platform.iconStyle}
                />
              </div>
              <div className={styles.name}>{platform.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Token */}
      {choice.platform && selectedPlatform && (
        <section className={styles.step} ref={tokenSectionRef}>
          <h2 className={styles.stepTitle}>Pick a Token</h2>
          <div className={styles.grid}>
            {getValidTokens(selectedPlatform).map((token) => {
              const IconComponent = token.icon;
              return (
                <button
                  key={token.id}
                  className={`${styles.card} ${
                    choice.token === token.id ? styles.active : ""
                  }`}
                  onClick={() =>
                    updateChoice({ token: token.id, reader: null })
                  }
                >
                  <div className={styles.icon}>
                    <IconComponent size={56} />
                  </div>
                  <div className={styles.name}>{token.name}</div>
                  <div className={styles.description}>{token.description}</div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Step 3: Reader */}
      {choice.token && selectedToken && (
        <section className={styles.step} ref={readerSectionRef}>
          <h2 className={styles.stepTitle}>Pick a Reader</h2>
          <div className={styles.grid}>
            {getValidReaders(selectedToken).map((reader) => {
              const IconComponent = reader.icon;
              return (
                <button
                  key={reader.id}
                  className={`${styles.card} ${
                    choice.reader === reader.id ? styles.active : ""
                  }`}
                  onClick={() => updateChoice({ reader: reader.id })}
                >
                  <div className={styles.icon}>
                    <IconComponent size={56} />
                  </div>
                  <div className={styles.name}>{reader.name}</div>
                  <div className={styles.description}>{reader.description}</div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Summary */}
      {choice.platform && choice.token && choice.reader && (
        <section className={styles.step} ref={summarySectionRef}>
          <h2 className={styles.stepTitle}>Your Zaparoo Setup</h2>
          <div className={styles.summaryCard}>
            <SummaryContent choice={choice} />
          </div>
        </section>
      )}
    </div>
  );
};

const SummaryContent: React.FC<{ choice: Choice }> = ({ choice }) => {
  const platformNames = {
    mister: "MiSTer FPGA",
    batocera: "Batocera",
    windows: "Windows",
    steamos: "SteamOS",
    libreelec: "LibreELEC",
  };

  const needsAppPro = choice.reader === "zaparoo-app";
  const needsPhone = needsAppPro || choice.reader === "phone-camera";
  const needsUSBReader = choice.reader === "usb-nfc-reader";
  const needsOpticalDrive = choice.reader === "optical-drive";

  return (
    <div className={styles.summaryGrid}>
      {/* What You Need */}
      <div className={styles.summarySection}>
        <h3>What You Need</h3>
        <ul>
          <li>{platformNames[choice.platform!]} device</li>

          {/* Reader hardware */}
          {needsUSBReader && (
            <li>USB NFC reader (PN532 or ACR122U, ~$10-20)</li>
          )}
          {needsPhone && (
            <li>
              Phone with{" "}
              {choice.reader === "zaparoo-app" ? "NFC or camera" : "camera"}
            </li>
          )}
          {needsOpticalDrive && <li>CD/DVD/Blu-ray drive</li>}

          {/* Token hardware */}
          {choice.token === "nfc-cards" && (
            <li>NTAG215 NFC cards or stickers</li>
          )}
          {choice.token === "qr-codes" && <li>Printer for QR codes</li>}
          {choice.token === "amiibo" && (
            <li>Your Amiibo or Lego Dimensions figures</li>
          )}
          {choice.token === "optical" && (
            <li>Discs with data (blank discs won't work)</li>
          )}

          {/* App Pro requirement */}
          {needsAppPro && (
            <li>
              <strong>Zaparoo App Pro</strong> (one-time purchase, enables
              scanning features)
            </li>
          )}
        </ul>

        {/* Platform-specific warnings */}
        {choice.platform === "mister" && needsUSBReader && (
          <div className="alert alert--warning" style={{ marginTop: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              <AlertTriangle
                size={18}
                style={{ marginTop: "0.1rem", flexShrink: 0 }}
              />
              <div>
                <strong>MiSTer Note:</strong> Some ACR122U clones are
                incompatible. PN532 USB is the safer choice.
              </div>
            </div>
          </div>
        )}
        {choice.platform === "windows" && needsUSBReader && (
          <div className="alert alert--info" style={{ marginTop: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              <Info size={18} style={{ marginTop: "0.1rem", flexShrink: 0 }} />
              <div>
                <strong>Windows Note:</strong> ACR122U requires Smart Card
                service enabled.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Downloads */}
      <div className={styles.summarySection}>
        <h3>Download & Install</h3>
        <Link
          to={`/docs/platforms/${choice.platform}#install`}
          className="button button--primary button--block"
          style={{ marginBottom: "0.5rem" }}
        >
          <Download size={16} />
          Install Zaparoo on {platformNames[choice.platform!]}
        </Link>
        {needsPhone && (
          <Link
            to="https://zaparoo.app"
            className="button button--primary button--block"
          >
            <Download size={16} />
            Zaparoo App{needsAppPro ? " (Pro required)" : ""}
          </Link>
        )}
      </div>

      {/* Shop */}
      {(needsUSBReader || choice.token === "nfc-cards") && (
        <div className={styles.summarySection}>
          <h3>Get Hardware</h3>
          <Link
            to="https://shop.zaparoo.com"
            className="button button--success button--block"
            style={{ marginBottom: "0.5rem" }}
          >
            <ShoppingCart size={16} />
            Official Zaparoo Shop
          </Link>
          <Link
            to="/docs/community/vendors"
            className="button button--success button--outline button--block"
          >
            <ShoppingCart size={16} />
            Community Vendors
          </Link>
        </div>
      )}

      {/* Next Steps */}
      <div className={styles.summarySection}>
        <h3>Next Steps</h3>
        <ol>
          <li>
            Install Zaparoo Core on your {platformNames[choice.platform!]}
          </li>

          {needsUSBReader && <li>Connect your USB NFC reader</li>}
          {needsPhone && <li>Install Zaparoo App on your phone</li>}
          {needsOpticalDrive && <li>Connect your optical drive</li>}

          {choice.token === "nfc-cards" && (
            <li>
              Design and order labels at{" "}
              <a href="https://design.zaparoo.org">design.zaparoo.org</a>
            </li>
          )}
          {choice.token === "qr-codes" && (
            <li>
              Learn <a href="/docs/core/zapscript">ZapScript format</a> and
              generate QR codes
            </li>
          )}
          {choice.token === "amiibo" && (
            <li>
              Set up <a href="/docs/core/mappings">UID mapping</a> for your
              figures
            </li>
          )}
          {choice.token === "optical" && (
            <li>
              Prepare your discs (must have data, see{" "}
              <a href={`/docs/platforms/${choice.platform}`}>platform guide</a>)
            </li>
          )}

          <li>Start scanning!</li>
        </ol>
      </div>

      {/* Help */}
      <div className={styles.summarySection}>
        <h3>Need Help?</h3>
        <Link
          to={`/docs/platforms/${choice.platform}`}
          className="button button--secondary button--block"
          style={{ marginBottom: "0.5rem" }}
        >
          <Book size={16} />
          {platformNames[choice.platform!]} Guide
        </Link>
        <Link
          to="https://zaparoo.org/discord"
          className="button button--secondary button--outline button--block"
        >
          <MessageCircle size={16} />
          Join Discord
        </Link>
      </div>
    </div>
  );
};
