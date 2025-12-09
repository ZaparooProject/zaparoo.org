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
} from "lucide-react";
import styles from "./StartWizard.module.css";
import {
  StyledButton,
  Admonition,
  DiscordIcon,
  RedditIcon,
} from "./SummaryComponents";

type Platform =
  | "mister"
  | "batocera"
  | "windows"
  | "linux"
  | "steamos"
  | "libreelec"
  | null;
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
    id: "linux",
    name: "Linux",
    icon: "/img/logos/linux.webp",
    iconStyle: { width: "63.28px", height: "75px" },
    provides: [
      CAPABILITIES.OPTICAL_DRIVE,
      CAPABILITIES.USB_PORT,
      CAPABILITIES.NETWORK,
    ],
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
    id: "barcode",
    name: "Barcodes",
    icon: ScanBarcode,
    description: "Use real barcodes",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.BARCODE],
  },
  {
    id: "amiibo",
    name: "NFC Toys",
    icon: PersonStanding,
    description: "Reuse your figurines",
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
  {
    id: "removable-media",
    name: "Removable Media",
    icon: MemoryStick,
    description: "USB sticks and SD cards",
    requires: [], // Works on all platforms
    provides: [CAPABILITIES.REMOVABLE_MEDIA],
  },
  {
    id: "digital-triggers",
    name: "Digital Triggers",
    icon: Workflow,
    description: "Scripts, automation, and APIs",
    requires: [CAPABILITIES.NETWORK],
    provides: [CAPABILITIES.DIGITAL_TRIGGER],
  },
];

const readers: ReaderConfig[] = [
  {
    id: "usb-nfc-reader",
    name: "USB NFC Reader",
    icon: Usb,
    description: "Best experience",
    requires: [CAPABILITIES.NFC_TAG],
  },
  {
    id: "zaparoo-app",
    name: "Zaparoo App",
    icon: Smartphone,
    description: "Fastest way to try",
    requires: [
      CAPABILITIES.NFC_TAG,
      CAPABILITIES.QR_CODE,
      CAPABILITIES.BARCODE,
    ],
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
  {
    id: "zapesp32",
    name: "ZapESP32",
    icon: Cpu,
    description: "Custom DIY reader",
    requires: [CAPABILITIES.NFC_TAG],
  },
  {
    id: "rs232-scanner",
    name: "RS232 Scanner",
    icon: ScanBarcode,
    description: "Serial barcode scanner",
    requires: [CAPABILITIES.BARCODE, CAPABILITIES.QR_CODE],
  },
  {
    id: "external-drive",
    name: "External Drive",
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
    name: "Zaparoo API",
    icon: Braces,
    description: "Use Core API direct",
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

      // Validate platform
      const validPlatform = platforms.find((p) => p.id === platform);
      if (validPlatform) {
        isRestoringFromHash.current = true;
        setChoice({ platform, token, reader });
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
        <section
          className={`${styles.step} ${
            !isRestoringFromHash.current ? styles.animated : ""
          }`}
          ref={tokenSectionRef}
        >
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
        <section
          className={`${styles.step} ${
            !isRestoringFromHash.current ? styles.animated : ""
          }`}
          ref={readerSectionRef}
        >
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
        <section
          className={`${styles.step} ${
            !isRestoringFromHash.current ? styles.animated : ""
          }`}
          ref={summarySectionRef}
        >
          <h2 className={styles.stepTitle}>Your Zaparoo Setup</h2>
          <div className={styles.summaryCard}>
            <SummaryContent choice={choice} />
          </div>
          <p style={{ fontStyle: "italic", marginTop: "1.5rem" }}>
            Trademarks shown on this page are property of their respective
            owners. The Zaparoo project uses logos on this page in good faith
            and/or within published usage guidelines, to show compatibility with
            the respective operating system they represent. The Zaparoo project
            is not affiliated with nor receives endorsement from any of the
            projects or companies shown above.
          </p>
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
    linux: "Linux",
    steamos: "SteamOS",
    libreelec: "LibreELEC",
  };

  const needsAppPro = choice.reader === "zaparoo-app";
  const needsPhone = needsAppPro || choice.reader === "phone-camera";
  const needsUSBReader = choice.reader === "usb-nfc-reader";
  const needsOpticalDrive = choice.reader === "optical-drive";
  const needsZapESP32 = choice.reader === "zapesp32";
  const needsRS232 = choice.reader === "rs232-scanner";
  const needsExternalDrive = choice.reader === "external-drive";
  const needsMQTT = choice.reader === "mqtt";
  const needsFileReader = choice.reader === "file-reader";
  const needsAPI = choice.reader === "api";

  const selectedToken = tokens.find((t) => t.id === choice.token);

  return (
    <div className={styles.summaryContainer}>
      {/* Main two-column layout */}
      <div className={styles.summaryMainGrid}>
        {/* Left Column: What You'll Need */}
        <div className={styles.summarySection}>
          <h3>What You'll Need</h3>
          <ul>
            <li>
              <a href={`/docs/platforms/${choice.platform}`}>
                {platformNames[choice.platform!]}
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
                <a href="/docs/readers/barcode/rs232">RS232 barcode scanner</a>
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
                <a href="/docs/tokens/nfc-toys/amiibo">Amiibo</a> or{" "}
                <a href="/docs/tokens/nfc-toys/lego-dimensions">
                  Lego Dimensions
                </a>{" "}
                figurines
              </li>
            )}
            {choice.token === "optical" && <li>Discs with data</li>}
            {choice.token === "removable-media" && (
              <li>USB sticks or SD cards</li>
            )}
          </ul>

          {/* Downloads */}
          <h4 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
            Get Software
          </h4>
          <div className={styles.downloadButtons}>
            <StyledButton
              to={`/downloads/#${choice.platform}`}
              variant="primary"
              outline
              block
              icon={<Download size={16} />}
            >
              Zaparoo Core
            </StyledButton>
            <StyledButton
              to="/downloads/#zaparoo-app"
              variant="primary"
              outline
              block
              icon={<Download size={16} />}
            >
              Zaparoo App
            </StyledButton>
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
          {(needsUSBReader || choice.token === "nfc-cards") && (
            <>
              <h4 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
                Get Hardware
              </h4>
              <div className={styles.shopLinks}>
                <StyledButton
                  to="https://shop.zaparoo.com"
                  variant="primary"
                  outline
                  block
                  icon={<ShoppingCart size={16} />}
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
                    Generic NFC Readers
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
                    Generic NFC Tags
                  </StyledButton>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Column: Getting Started */}
        <div className={styles.summarySection}>
          <h3>Getting Started</h3>
          <ol className={styles.gettingStartedList}>
            <li className={styles.emphasizedStep}>
              Install <a href="/docs/core/">Zaparoo Core</a> on device
              <StyledButton
                to={`/docs/platforms/${choice.platform}#install`}
                variant="secondary"
                outline
                block
                icon={<Book size={16} />}
                className={styles.emphasizedStepButton}
              >
                Install Guide
              </StyledButton>
            </li>

            <li>
              Install <a href="/docs/app/">Zaparoo App</a> on your phone and
              connect to device
            </li>

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
                  <a href="/docs/core/drivers#optical-drive">reader driver</a>
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
            {choice.token === "qr-codes" && (
              <li>
                <a href="/docs/tokens/qr-codes/">Generate QR codes</a> with{" "}
                <a href="/docs/zapscript">ZapScript</a> on them
              </li>
            )}
            {choice.token === "barcode" && (
              <li>
                Set up <a href="/docs/core/mappings">mappings</a> to barcode
                values
              </li>
            )}
            {choice.token === "amiibo" && (
              <li>
                Set up <a href="/docs/core/mappings">UID mappings</a> to the
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
                  Set up <a href="/docs/core/mappings">mappings</a> to the disc
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
            {choice.token === "digital-triggers" && (
              <li>
                Create automations that send{" "}
                <a href="/docs/zapscript">ZapScript</a> commands
              </li>
            )}

            <li>Start zapping!</li>
          </ol>
        </div>
      </div>

      {needsUSBReader && (
        <Admonition
          type="warning"
          title="Buying Generic NFC Readers"
          className={styles.appProCallout}
        >
          Not all generic NFC readers are compatible with Zaparoo. Check{" "}
          <a href="/docs/readers/nfc/">our documentation</a> for recommended
          models that offer the best combination of quality, compatibility, and
          availability.
        </Admonition>
      )}

      {needsAppPro && (
        <Admonition
          type="info"
          title="Zaparoo App Pro"
          className={styles.appProCallout}
        >
          Using your phone as a reader requires the{" "}
          <a href="/docs/app/">Pro upgrade</a> (a small one-time purchase that
          funds development).{" "}
          <strong>
            Configuring Zaparoo and creating tokens is always free.
          </strong>
        </Admonition>
      )}

      {choice.reader !== "zaparoo-app" && (
        <Admonition
          type="tip"
          title="Don't want an app?"
          className={styles.appProCallout}
        >
          The Zaparoo App provides the best and most convenient experience. If
          you can't or prefer not to use it, Zaparoo Core includes{" "}
          <a href="/docs/core/web-ui">Web UI</a> and{" "}
          <a href="/docs/core/cli">TUI</a> alternatives.
        </Admonition>
      )}

      {/* Need Help - Full Width Footer */}
      <div className={styles.summaryFooter}>
        <h3>Need Help?</h3>
        <div className={styles.helpButtons}>
          <StyledButton
            to={`/docs/platforms/${choice.platform}`}
            variant="secondary"
            outline
            icon={<Book size={16} />}
          >
            {platformNames[choice.platform!]} Guide
          </StyledButton>
          <StyledButton
            to="https://zaparoo.org/discord"
            variant="secondary"
            outline
            icon={<DiscordIcon size={16} />}
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
