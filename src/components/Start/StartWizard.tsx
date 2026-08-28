import React, { useState, useEffect } from "react";
import SponsorCallout from "@site/src/components/SponsorCallout";
import products from "@site/src/data/products";
import {
  supportTierDetails,
  wizardPlatforms,
  type PlatformId,
  type SupportTier,
} from "@site/src/data/platforms";
import {
  QrCode,
  Disc,
  Usb,
  Smartphone,
  Camera,
  Download,
  ShoppingCart,
  Book,
  SmartphoneNfc,
  PersonStanding,
  ScanBarcode,
  Cpu,
  Radio,
  FileText,
  HardDrive,
  MemoryStick,
  Workflow,
  Braces,
  Link2,
  Check,
} from "lucide-react";
import styles from "./StartWizard.module.css";
import {
  StyledButton,
  Admonition,
  DiscordIcon,
  RedditIcon,
} from "./SummaryComponents";

type Platform = PlatformId | null;
type Token =
  | "nfc-cards"
  | "qr-codes"
  | "barcode"
  | "amiibo"
  | "optical"
  | "removable-media"
  | "digital-triggers"
  | null;
type Reader =
  | "usb-nfc-reader"
  | "zaparoo-app"
  | "phone-camera"
  | "optical-drive"
  | "zapesp32"
  | "rs232-scanner"
  | "external-drive"
  | "mqtt"
  | "file-reader"
  | "api"
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
  BARCODE: "barcode",
  PHYSICAL_MEDIA: "physical_media",
  REMOVABLE_MEDIA: "removable_media",
  DIGITAL_TRIGGER: "digital_trigger",
} as const;

type Capability = (typeof CAPABILITIES)[keyof typeof CAPABILITIES];

interface PlatformConfig {
  id: NonNullable<Platform>;
  name: string;
  icon: string;
  iconStyle?: React.CSSProperties;
  docsPath: string;
  provides: Capability[];
  supportTier: SupportTier;
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

const platforms: PlatformConfig[] = wizardPlatforms.map((platform) => ({
  id: platform.id,
  name: platform.name,
  icon: platform.icon,
  iconStyle: platform.iconStyle,
  docsPath: platform.docsPath,
  provides: [...platform.wizard.provides],
  supportTier: platform.supportTier,
}));

const tokens: TokenConfig[] = [
  {
    id: "nfc-cards",
    name: "NFC cards and tags",
    icon: SmartphoneNfc,
    description: "Cards, stickers, and keyfobs",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.NFC_TAG],
  },
  {
    id: "qr-codes",
    name: "QR codes",
    icon: QrCode,
    description: "Print your own for free",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.QR_CODE],
  },
  {
    id: "barcode",
    name: "Barcodes",
    icon: ScanBarcode,
    description: "Barcodes on boxes you own",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.BARCODE],
  },
  {
    id: "amiibo",
    name: "NFC toys",
    icon: PersonStanding,
    description: "Amiibo, Skylanders, and more",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.NFC_TAG],
  },
  {
    id: "optical",
    name: "Optical discs",
    icon: Disc,
    description: "CDs, DVDs or Blu-rays",
    requires: [CAPABILITIES.OPTICAL_DRIVE], // Only platforms with optical drives
    provides: [CAPABILITIES.PHYSICAL_MEDIA],
  },
  {
    id: "removable-media",
    name: "Removable media",
    icon: MemoryStick,
    description: "USB sticks and SD cards",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.REMOVABLE_MEDIA],
  },
  {
    id: "digital-triggers",
    name: "Software triggers",
    icon: Workflow,
    description: "Automations, scripts, and apps",
    requires: [CAPABILITIES.NETWORK],
    provides: [CAPABILITIES.DIGITAL_TRIGGER],
  },
];

const readers: ReaderConfig[] = [
  {
    id: "usb-nfc-reader",
    name: "USB NFC reader",
    icon: Usb,
    description: "Plug-and-play hardware",
    requires: [CAPABILITIES.NFC_TAG],
  },
  {
    id: "zaparoo-app",
    name: "Zaparoo App",
    icon: Smartphone,
    description: "Phone NFC or camera",
    requires: [
      CAPABILITIES.NFC_TAG,
      CAPABILITIES.QR_CODE,
      CAPABILITIES.BARCODE,
    ],
  },
  {
    id: "phone-camera",
    name: "Phone camera",
    icon: Camera,
    description: "Any camera app, no Zaparoo App needed",
    requires: [CAPABILITIES.QR_CODE],
  },
  {
    id: "optical-drive",
    name: "Optical drive",
    icon: Disc,
    description: "USB or internal drive",
    requires: [CAPABILITIES.PHYSICAL_MEDIA],
  },
  {
    id: "zapesp32",
    name: "ZapESP32",
    icon: Cpu,
    description: "DIY wireless NFC reader",
    requires: [CAPABILITIES.NFC_TAG],
  },
  {
    id: "rs232-scanner",
    name: "Serial barcode scanner",
    icon: ScanBarcode,
    description: "RS-232 or USB-COM mode",
    requires: [CAPABILITIES.BARCODE, CAPABILITIES.QR_CODE],
  },
  {
    id: "external-drive",
    name: "External drive",
    icon: HardDrive,
    description: "USB or SD card reader",
    requires: [CAPABILITIES.REMOVABLE_MEDIA],
  },
  {
    id: "mqtt",
    name: "MQTT",
    icon: Radio,
    description: "Home Assistant and IoT",
    requires: [CAPABILITIES.DIGITAL_TRIGGER],
  },
  {
    id: "file-reader",
    name: "Files",
    icon: FileText,
    description: "Watch a text file",
    requires: [CAPABILITIES.DIGITAL_TRIGGER],
  },
  {
    id: "api",
    name: "Core API",
    icon: Braces,
    description: "Call the Core API directly",
    requires: [CAPABILITIES.DIGITAL_TRIGGER],
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

  // Track if we're restoring from URL hash (initial load)
  const isRestoringFromHash = React.useRef(false);

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

      const validPlatform = platforms.find((p) => p.id === platform);
      if (validPlatform) {
        const validToken = getValidTokens(validPlatform).find(
          (candidate) => candidate.id === token,
        );
        const validReader = validToken
          ? getValidReaders(validToken).find(
              (candidate) => candidate.id === reader,
            )
          : undefined;

        isRestoringFromHash.current = true;
        setChoice({
          platform: validPlatform.id,
          token: validToken?.id ?? null,
          reader: validReader?.id ?? null,
        });
        // Reset flag after state updates have processed
        setTimeout(() => {
          isRestoringFromHash.current = false;
        }, 150);
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
        history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`,
        );
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
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${newHash}`,
      );
    }
  }, [choice]);

  // Auto-scroll to next section when platform is selected
  useEffect(() => {
    if (choice.platform && tokenSectionRef.current) {
      setTimeout(() => {
        tokenSectionRef.current?.scrollIntoView({
          behavior: isRestoringFromHash.current ? "auto" : "smooth",
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
          behavior: isRestoringFromHash.current ? "auto" : "smooth",
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
          behavior: isRestoringFromHash.current ? "auto" : "smooth",
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
        <h2 className={styles.stepTitle}>Pick a platform</h2>
        <div className={styles.grid}>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              data-umami-event="start-wizard-platform-selected"
              data-umami-event-platform={platform.id}
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
              <span
                className={styles.supportBadge}
                data-tier={platform.supportTier}
              >
                {supportTierDetails[platform.supportTier].label}
              </span>
            </button>
          ))}
        </div>
        <p className={styles.tierLegend}>
          <strong>{supportTierDetails.stable.label}:</strong>{" "}
          {supportTierDetails.stable.description}{" "}
          <strong>{supportTierDetails.beta.label}:</strong>{" "}
          {supportTierDetails.beta.description} Platform not listed? See{" "}
          <a href="/docs/platforms/">all platforms</a>.
        </p>
      </section>

      {/* Step 2: Token */}
      {choice.platform && selectedPlatform && (
        <section
          className={`${styles.step} ${
            !isRestoringFromHash.current ? styles.animated : ""
          }`}
          ref={tokenSectionRef}
        >
          <h2 className={styles.stepTitle}>Pick a token</h2>
          <div className={styles.grid}>
            {getValidTokens(selectedPlatform).map((token) => {
              const IconComponent = token.icon;
              return (
                <button
                  key={token.id}
                  data-umami-event="start-wizard-token-selected"
                  data-umami-event-platform={choice.platform ?? undefined}
                  data-umami-event-token={token.id}
                  className={`${styles.card} ${
                    choice.token === token.id ? styles.active : ""
                  }`}
                  onClick={() => {
                    const validReaders = getValidReaders(token);
                    updateChoice({
                      token: token.id,
                      reader:
                        validReaders.length === 1 ? validReaders[0].id : null,
                    });
                  }}
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
        <section
          className={`${styles.step} ${
            !isRestoringFromHash.current ? styles.animated : ""
          }`}
          ref={readerSectionRef}
        >
          <h2 className={styles.stepTitle}>
            {getValidReaders(selectedToken).length === 1
              ? "Your reader"
              : "Pick a reader"}
          </h2>
          <div className={styles.grid}>
            {getValidReaders(selectedToken).map((reader) => {
              const IconComponent = reader.icon;
              return (
                <button
                  key={reader.id}
                  data-umami-event="start-wizard-completed"
                  data-umami-event-platform={choice.platform ?? undefined}
                  data-umami-event-token={choice.token ?? undefined}
                  data-umami-event-reader={reader.id}
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
        <section
          className={`${styles.step} ${
            !isRestoringFromHash.current ? styles.animated : ""
          }`}
          ref={summarySectionRef}
        >
          <div className={styles.summaryHeading}>
            <h2 className={styles.stepTitle}>Your Zaparoo setup</h2>
            <CopySetupLink />
          </div>
          <div className={styles.summaryCard}>
            <SummaryContent choice={choice} />
          </div>
        </section>
      )}
    </div>
  );
};

const CopySetupLink: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the URL already contains the setup.
    }
  };
  return (
    <button
      type="button"
      className="button button--secondary button--outline button--sm"
      onClick={copy}
      data-umami-event="start-summary-copy-link"
      aria-live="polite"
    >
      {copied ? <Check size={14} /> : <Link2 size={14} />}{" "}
      {copied ? "Link copied" : "Copy link to this setup"}
    </button>
  );
};

const SummaryContent: React.FC<{ choice: Choice }> = ({ choice }) => {
  const selectedPlatform = platforms.find(
    (platform) => platform.id === choice.platform,
  );
  const selectedToken = tokens.find((token) => token.id === choice.token);
  const usesPhoneCamera = choice.reader === "phone-camera";
  const needsAppPro = choice.reader === "zaparoo-app";
  const needsPhone = needsAppPro || usesPhoneCamera;
  const needsUSBReader = choice.reader === "usb-nfc-reader";
  const needsOpticalDrive = choice.reader === "optical-drive";
  const needsZapESP32 = choice.reader === "zapesp32";
  const needsRS232 = choice.reader === "rs232-scanner";
  const needsExternalDrive = choice.reader === "external-drive";
  const needsMQTT = choice.reader === "mqtt";
  const needsFileReader = choice.reader === "file-reader";
  const needsAPI = choice.reader === "api";
  const isSoftwareTrigger = choice.token === "digital-triggers";
  const isMister = choice.platform === "mister";

  return (
    <div className={styles.summaryContainer}>
      {/* Main two-column layout */}
      <div className={styles.summaryMainGrid}>
        {/* Left Column: What You'll Need */}
        <div className={styles.summarySection}>
          <h3>What you'll need</h3>
          <ul>
            <li>
              <a href={selectedPlatform?.docsPath}>
                {selectedPlatform?.name}
              </a>{" "}
              device
            </li>

            {/* Reader hardware */}
            {needsUSBReader && (
              <li>
                <a href="/docs/readers/nfc/pn532-usb/">USB NFC reader</a>
              </li>
            )}
            {needsPhone && (
              <li>
                Phone with{" "}
                {choice.reader === "zaparoo-app"
                  ? selectedToken?.provides.includes(CAPABILITIES.NFC_TAG)
                    ? "NFC"
                    : "camera"
                  : "camera"}
              </li>
            )}
            {needsOpticalDrive && (
              <li>
                <a href="/docs/readers/optical-drive">CD/DVD/Blu-ray drive</a>
              </li>
            )}
            {needsZapESP32 && (
              <>
                <li>ESP32 development board</li>
                <li>
                  <a href="/docs/readers/nfc/pn532-module">PN532</a> or{" "}
                  <a href="/docs/readers/nfc/rc522">RC522</a> NFC module
                </li>
              </>
            )}
            {needsRS232 && (
              <li>
                <a href="/docs/readers/barcode/rs232/">RS-232 barcode scanner</a>
              </li>
            )}
            {needsMQTT && (
              <li>
                <a href="/docs/readers/mqtt">MQTT broker</a> (e.g. Home
                Assistant)
              </li>
            )}

            {/* Token hardware */}
            {choice.token === "nfc-cards" && (
              <li>
                <a href="/docs/tokens/nfc/ntag/">NTAG NFC tags</a>
              </li>
            )}
            {choice.token === "qr-codes" && <li>Printer for QR codes</li>}
            {choice.token === "amiibo" && (
              <li>
                <a href="/docs/tokens/nfc-toys/#amiibo">Amiibo</a>,{" "}
                <a href="/docs/tokens/nfc-toys/#skylanders">Skylanders</a>,{" "}
                <a href="/docs/tokens/nfc-toys/#disney-infinity">
                  Disney Infinity
                </a>
                , or{" "}
                <a href="/docs/tokens/nfc-toys/#lego-dimensions">
                  LEGO Dimensions
                </a>{" "}
                figures (read-only, so you map each figure to a game)
              </li>
            )}
            {choice.token === "barcode" && (
              <li>Boxes or products with a barcode</li>
            )}
            {needsFileReader && <li>A text file Core can watch</li>}
            {needsAPI && (
              <li>Your own script or app that calls the Core API</li>
            )}
            {choice.token === "optical" && <li>Discs with data</li>}
            {choice.token === "removable-media" && (
              <li>USB sticks or SD cards</li>
            )}
          </ul>

          {/* Downloads */}
          <h4 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
            Get software
          </h4>
          <div className={styles.downloadButtons}>
            <StyledButton
              to={`/downloads/#${choice.platform}`}
              variant="primary"
              outline
              block
              icon={<Download size={16} />}
              dataUmamiEvent="start-summary-download-core"
              umamiPlatform={choice.platform ?? undefined}
              umamiToken={choice.token ?? undefined}
              umamiReader={choice.reader ?? undefined}
            >
              Zaparoo Core
            </StyledButton>
            {!usesPhoneCamera && !isSoftwareTrigger && (
              <StyledButton
                to="/downloads/#zaparoo-app"
                variant="primary"
                outline
                block
                icon={<Download size={16} />}
                dataUmamiEvent="start-summary-download-app"
                umamiPlatform={choice.platform ?? undefined}
                umamiToken={choice.token ?? undefined}
                umamiReader={choice.reader ?? undefined}
              >
                Zaparoo App
              </StyledButton>
            )}
            {needsZapESP32 && (
              <>
                <StyledButton
                  to="https://www.arduino.cc/en/software"
                  variant="secondary"
                  outline
                  block
                  icon={<Download size={16} />}
                >
                  Arduino IDE
                </StyledButton>
                <StyledButton
                  to="https://github.com/ZaparooProject/zaparoo-esp32"
                  variant="primary"
                  outline
                  block
                  icon={<Download size={16} />}
                >
                  ZapESP32 Firmware
                </StyledButton>
              </>
            )}
          </div>

          {/* Shop Links */}
          {(needsUSBReader ||
            choice.token === "nfc-cards" ||
            choice.token === "amiibo") && (
            <>
              <h4 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
                Get hardware
              </h4>
              <p className={styles.shopNote}>
                Official readers are tested with Zaparoo and include a case.
              </p>
              <div className={styles.shopLinks}>
                <StyledButton
                  to="https://shop.zaparoo.com"
                  variant="primary"
                  outline
                  block
                  icon={<ShoppingCart size={16} />}
                  dataUmamiEvent="start-summary-shop"
                  umamiPlatform={choice.platform ?? undefined}
                  umamiToken={choice.token ?? undefined}
                  umamiReader={choice.reader ?? undefined}
                >
                  Zaparoo Shop
                </StyledButton>
                {needsUSBReader && (
                  <StyledButton
                    to="/docs/readers/nfc/pn532-usb/"
                    variant="secondary"
                    outline
                    block
                    icon={<Book size={16} />}
                  >
                    Compatible NFC readers
                  </StyledButton>
                )}
                {choice.token === "nfc-cards" && (
                  <StyledButton
                    to="/docs/tokens/nfc/ntag/"
                    variant="secondary"
                    outline
                    block
                    icon={<Book size={16} />}
                  >
                    Compatible NFC tags
                  </StyledButton>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Column: Getting Started */}
        <div className={styles.summarySection}>
          <h3>Getting started</h3>
          <ol className={styles.gettingStartedList}>
            <li className={styles.emphasizedStep}>
              Install <a href="/docs/core/">Zaparoo Core</a> on device
              <StyledButton
                to={`${selectedPlatform?.docsPath ?? "/docs/platforms/"}#install`}
                variant="secondary"
                outline
                block
                icon={<Book size={16} />}
                className={styles.emphasizedStepButton}
                dataUmamiEvent="start-summary-install-guide"
                umamiPlatform={choice.platform ?? undefined}
                umamiToken={choice.token ?? undefined}
                umamiReader={choice.reader ?? undefined}
              >
                Install Guide
              </StyledButton>
            </li>

            {usesPhoneCamera ? (
              <li>
                Follow the{" "}
                <a href="/docs/tokens/qr-codes/#phone-camera-url">
                  phone camera URL guide
                </a>{" "}
                to include your Core address in each QR code and allow remote
                launch requests
              </li>
            ) : needsAppPro ? (
              <li>
                Install the <a href="/docs/app/">Zaparoo App</a>, connect to
                your device, and turn on Launch on scan (Pro)
              </li>
            ) : isSoftwareTrigger ? (
              <li>
                Send <a href="/docs/zapscript/">ZapScript</a> from your
                automation; no phone app needed
              </li>
            ) : (
              <li>
                Install the <a href="/docs/app/">Zaparoo App</a> on your phone
                to connect, manage setup, and write tokens
              </li>
            )}

            {needsUSBReader && <li>Connect your NFC reader</li>}
            {needsZapESP32 && (
              <>
                <li>
                  <a href="https://github.com/ZaparooProject/zaparoo-esp32">
                    Build and flash
                  </a>{" "}
                  your ZapESP32
                </li>
                <li>
                  <a href="/docs/zapesp32/">Configure ZapESP32</a> to connect to
                  device
                </li>
              </>
            )}
            {needsOpticalDrive && (
              <>
                <li>
                  Configure the{" "}
                  <a href="/docs/readers/optical-drive">reader driver</a>
                </li>
                <li>Connect your optical drive</li>
              </>
            )}
            {needsRS232 && (
              <li>
                <a href="/docs/readers/barcode/rs232">Configure RS232</a> serial
                port
              </li>
            )}
            {needsExternalDrive && (
              <li>
                <a href="/docs/readers/external-drive">Enable external drive</a>{" "}
                reader in config
              </li>
            )}
            {needsMQTT && (
              <li>
                <a href="/docs/readers/mqtt">Configure MQTT</a> broker
                connection
              </li>
            )}
            {needsFileReader && (
              <li>
                <a href="/docs/readers/file">Configure file reader</a> path
              </li>
            )}
            {needsAPI && (
              <li>
                Review <a href="/docs/core/api">API documentation</a> for
                endpoints
              </li>
            )}

            {choice.token === "nfc-cards" && (
              <>
                <li>
                  <a href="/docs/app/">Link media</a> to your cards using the
                  Zaparoo App
                </li>
                <li>
                  Design and{" "}
                  <a href="/docs/labels/printing-guide">print card labels</a>{" "}
                  with <a href="https://design.zaparoo.org">Zaparoo Designer</a>
                </li>
              </>
            )}
            {choice.token === "qr-codes" &&
              (usesPhoneCamera ? (
                <li>
                  Scan each URL-based QR code with your normal camera app and
                  open the link to launch it
                </li>
              ) : (
                <li>
                  <a href="/docs/tokens/qr-codes/">Generate QR codes</a> with{" "}
                  <a href="/docs/zapscript">ZapScript</a> on them
                </li>
              ))}
            {choice.token === "barcode" && (
              <li>
                Set up <a href="/docs/features/mappings">mappings</a> to barcode
                values
              </li>
            )}
            {choice.token === "amiibo" && (
              <li>
                Set up <a href="/docs/features/mappings">UID mappings</a> to the
                figurines
              </li>
            )}
            {choice.token === "optical" && (
              <>
                <li>
                  <a href="/docs/readers/optical-drive">Prepare your discs</a>{" "}
                  (must have data)
                </li>
                <li>
                  Set up <a href="/docs/features/mappings">mappings</a> to the disc
                  IDs
                </li>
              </>
            )}
            {choice.token === "removable-media" && (
              <li>
                Create <code>zaparoo.txt</code> files with{" "}
                <a href="/docs/zapscript">ZapScript</a> on your drives
              </li>
            )}
            {isMister && (
              <li>
                Optional:{" "}
                <a href="/docs/features/backups/">
                  back up your saves and settings
                </a>
                . Local backups are free; Warp adds automatic off-site copies.
              </li>
            )}

            <li>Tap a token and play.</li>
          </ol>
        </div>
      </div>

      {needsUSBReader && (
        <Admonition
          type="warning"
          title="Using your own NFC reader?"
          className={styles.appProCallout}
        >
          Not every generic reader works. Check the{" "}
          <a href="/docs/readers/nfc/">compatible models</a> before you buy.
          Readers from the Zaparoo Shop are tested and include a case.
        </Admonition>
      )}

      {needsAppPro && (
        <Admonition
          type="info"
          title="Zaparoo App Pro"
          className={styles.appProCallout}
        >
          Using your phone as a reader needs{" "}
          <a href="/docs/app/#zaparoo-app-pro">{products.appPro.name}</a>, a{" "}
          {products.appPro.price} that funds development (included with Warp).{" "}
          <strong>{products.appPro.freeLine}</strong>
        </Admonition>
      )}

      {choice.reader !== "zaparoo-app" &&
        !usesPhoneCamera &&
        !isSoftwareTrigger && (
        <Admonition
          type="tip"
          title="Don't want an app?"
          className={styles.appProCallout}
        >
          The Zaparoo App is the main phone interface. If you can't or prefer
          not to use it, Zaparoo Core includes{" "}
          <a href="/docs/app/web/">Web UI</a> and{" "}
          <a href="/docs/core/tui">TUI</a> alternatives.
        </Admonition>
      )}

      {/* Sponsor callout */}
      <SponsorCallout variant="sponsor" className={styles.sponsorCallout} />

      {/* Need Help - Full Width Footer */}
      <div className={styles.summaryFooter}>
        <h3>Need help?</h3>
        <div className={styles.helpButtons}>
          <StyledButton
            to={selectedPlatform?.docsPath ?? "/docs/platforms/"}
            variant="secondary"
            outline
            icon={<Book size={16} />}
          >
            {selectedPlatform?.name} Guide
          </StyledButton>
          <StyledButton
            to="https://zaparoo.org/discord"
            variant="secondary"
            outline
            icon={<DiscordIcon size={16} />}
            dataUmamiEvent="start-summary-discord"
          >
            Join Discord
          </StyledButton>
          <StyledButton
            to="https://reddit.com/r/Zaparoo"
            variant="secondary"
            outline
            icon={<RedditIcon size={16} />}
          >
            Ask on Reddit
          </StyledButton>
        </div>
      </div>
    </div>
  );
};
