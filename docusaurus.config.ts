import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Zaparoo",
  tagline: "Universal Loading System",
  favicon: "img/favicon.ico",

  url: "https://zaparoo.org",
  baseUrl: "/",

  organizationName: "ZaparooProject",
  projectName: "zaparoo.org",
  trailingSlash: true,

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  future: {
    experimental_faster: {
      swcJsLoader: true, // Use SWC for JS transpilation
      swcJsMinimizer: true, // Use SWC for JS minification
      swcHtmlMinimizer: true, // Use SWC for HTML minification
      lightningCssMinimizer: true, // Use Lightning CSS for CSS minification
      // rspackBundler: true,      // Disabled due to React 19 compatibility issues
      mdxCrossCompilerCache: true, // Compile MDX once for both environments
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/ZaparooProject/zaparoo.org/tree/main/",
          lastVersion: "2.8.0",
          includeCurrentVersion: true,
          versions: {
            current: {
              label: "Next",
              path: "next",
              banner: "unreleased",
              badge: true,
            },
            "2.8.0": {
              label: "v2.8.0",
              path: "/",
              banner: "none",
            },
            "2.7.1": {
              label: "v2.7.1",
              path: "/2.7.1/",
              banner: "none",
            },
            "2.7.0": {
              label: "v2.7.0",
              path: "/2.7.0/",
              banner: "none",
            },
            "2.6.2": {
              label: "v2.6.2",
              path: "/2.6.2/",
              banner: "none",
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/ZaparooProject/zaparoo.org/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          blogSidebarCount: 10,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/social-card.webp",
    navbar: {
      title: "Zaparoo",
      logo: {
        alt: "Zaparoo Logo",
        src: "img/logo_sm.webp",
      },
      items: [
        {
          to: "/start/",
          label: "Start",
          position: "left",
          "data-umami-event": "navbar-start",
        },
        {
          to: "/docs/",
          label: "Docs",
          position: "left",
          "data-umami-event": "navbar-docs",
        },
        {
          to: "/downloads/",
          label: "Downloads",
          position: "left",
          "data-umami-event": "navbar-downloads",
        },
        {
          href: "https://design.zaparoo.org/",
          label: "Designer",
          position: "left",
          "data-umami-event": "navbar-designer",
          className: "navbar__item--no-icon",
        },
        {
          to: "/blog/",
          label: "Blog",
          position: "left",
          "data-umami-event": "navbar-blog",
        },
        {
          to: "/support/",
          label: "Support",
          position: "left",
          "data-umami-event": "navbar-support",
        },
        {
          to: "/sponsor/",
          label: "Sponsor",
          position: "left",
          "data-umami-event": "navbar-sponsor",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
          className: "navbar-version-dropdown",
          "data-umami-event": "navbar-version-dropdown",
        },
        {
          type: "html",
          position: "right",
          value:
            '<div style="display: flex; flex-direction: row; gap: 0.8rem; line-height: 1.25; padding: var(--ifm-menu-link-padding-vertical) var(--ifm-menu-link-padding-horizontal);"><a href="https://zaparoo.org/discord" data-umami-event="social-discord" aria-label="Zaparoo Discord" target="_blank"><div style="display: flex; align-items: center; color: var(--ifm-navbar-link-color)"><svg style="width: 24px; height: 24px; fill: currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg></div></a><a href="https://reddit.com/r/Zaparoo" data-umami-event="social-reddit" aria-label="Zaparoo Subreddit" target="_blank"><div style="display: flex; align-items: center; color: var(--ifm-navbar-link-color)"><svg style="width: 24px; height: 24px; fill: currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M373 138.6c-25.2 0-46.3-17.5-51.9-41l0 0c-30.6 4.3-54.2 30.7-54.2 62.4l0 .2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4C17.6 311.5 0 285.7 0 255.7c0-41.3 33.4-74.7 74.7-74.7c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4l0-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3zM157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9 .4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4z"/></svg></div></a><a href="https://www.youtube.com/@HeyZaparoo" data-umami-event="social-youtube" aria-label="Zaparoo YouTube" target="_blank"><div style="display: flex; align-items: center; color: var(--ifm-navbar-link-color)"><svg style="width: 24px; height: 24px; fill: currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg></div></a><a href="https://github.com/ZaparooProject" data-umami-event="social-github" aria-label="Zaparoo GitHub" target="_blank"><div style="display: flex; align-items: center; color: var(--ifm-navbar-link-color)"><svg style="width: 24px; height: 24px; fill: currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg></div></a></div>',
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Zaparoo.com",
          items: [
            {
              label: "Zaparoo Shop",
              href: "https://shop.zaparoo.com",
              "data-umami-event": "footer-shop",
            },
            {
              label: "Zaparoo Online",
              href: "https://zaparoo.com",
              "data-umami-event": "footer-online",
            },
            {
              label: "Commercial Use",
              href: "/contact#commercial-and-trademark-use",
              "data-umami-event": "footer-nav-commercial-use",
            },
          ],
        },
        {
          title: "Projects",
          items: [
            {
              label: "Official Projects",
              to: "/projects/",
              "data-umami-event": "footer-nav-projects",
            },
            {
              label: "Designer",
              href: "https://design.zaparoo.org/",
              "data-umami-event": "footer-designer",
            },
            {
              label: "ZapESP32",
              href: "https://github.com/ZaparooProject/zaparoo-esp32",
              "data-umami-event": "footer-zapesp32",
            },
            {
              label: "Contributors",
              href: "/docs/community-hub/contributors",
              "data-umami-event": "footer-nav-contributors",
            },
            {
              label: "GitHub Organization",
              href: "https://github.com/ZaparooProject/",
              "data-umami-event": "footer-github-org",
            },
          ],
        },
        {
          title: "Learn",
          items: [
            {
              label: "Docs",
              href: "/docs/",
              "data-umami-event": "footer-nav-docs",
            },
            {
              label: "Getting Started",
              href: "/start/",
              "data-umami-event": "footer-nav-getting-started",
            },
            {
              label: "ZapScript",
              href: "/docs/zapscript/",
              "data-umami-event": "footer-nav-zapscript",
            },
            {
              label: "Core API",
              href: "/docs/core/api/",
              "data-umami-event": "footer-nav-core-api",
            },
            {
              label: "Developer Guide",
              href: "/docs/core/dev/",
              "data-umami-event": "footer-nav-dev-guide",
            },
            {
              label: "Support",
              to: "/contact/",
              "data-umami-event": "footer-nav-support",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Community Projects",
              href: "/docs/community-projects",
              "data-umami-event": "footer-nav-community-projects",
            },
            {
              label: "Showcase",
              href: "/showcase",
              "data-umami-event": "footer-nav-showcase",
            },
            {
              label: "Discord",
              href: "https://zaparoo.org/discord",
              "data-umami-event": "footer-discord",
            },
            {
              label: "Reddit",
              href: "https://reddit.com/r/Zaparoo",
              "data-umami-event": "footer-reddit",
            },
            {
              label: "Lemmy",
              href: "https://lemmy.world/c/zaparoo",
              "data-umami-event": "footer-lemmy",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/@HeyZaparoo",
              "data-umami-event": "footer-youtube",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog/",
              "data-umami-event": "footer-nav-blog",
            },
            {
              label: "Sponsor",
              to: "/sponsor/",
              "data-umami-event": "footer-nav-sponsor",
            },
            {
              label: "Code of Conduct",
              to: "/conduct/",
              "data-umami-event": "footer-nav-conduct",
            },
            {
              label: "Privacy Policy",
              to: "/privacy/",
              "data-umami-event": "footer-nav-privacy",
            },
            {
              label: "Terms of Use",
              to: "/terms/",
              "data-umami-event": "footer-nav-terms",
            },
            {
              label: "Contact",
              to: "/contact/",
              "data-umami-event": "footer-nav-contact",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Contributors to the Zaparoo project. The Zaparoo name and logos are trademarks of Wizzo Pty Ltd.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: "77TW8QV8RJ",
      apiKey: "1a1a6d112273bca53b36497779516e42",
      indexName: "zaparoo",
      contextualSearch: true,
      searchPagePath: "search",
      insights: false,
    },
    // zoom: {
    //   selector: ".markdown img:not(a img)",
    //   background: {
    //     light: "rgb(255, 255, 255)",
    //     dark: "rgb(50, 50, 50)",
    //   },
    // },
  } satisfies Preset.ThemeConfig,

  plugins: [
    // "docusaurus-plugin-image-zoom",
    () => ({
      name: "umami-tracking",
      injectHtmlTags() {
        return {
          headTags: [
            {
              tagName: "script",
              attributes: {
                src: "https://cloud.umami.is/script.js",
                defer: true,
                "data-website-id": "43f9c3f2-720d-4c28-b4bc-b44808c9a7d1",
              },
            },
          ],
        };
      },
    }),
    [
      "docusaurus-plugin-remote-content",
      {
        name: "core-developer-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/ZaparooProject/zaparoo-core/refs/heads/main/docs/",
        outDir: "docs/core/dev",
        documents: ["index.md", "scan-behavior.md", "media-titles.md"],
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "core-api-docs",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/ZaparooProject/zaparoo-core/refs/heads/main/docs/api/",
        outDir: "docs/core/api",
        documents: ["index.md", "methods.md", "notifications.md"],
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/start/",
            from: "/docs/getting-started/",
          },
          {
            to: "/docs/core/drivers/",
            from: "/docs/core/reader-modules/",
          },
          // old site news redirects
          {
            to: "/blog/",
            from: "/news",
          },
          {
            to: "/blog/core-v2.0.0/",
            from: "/news/core-v2.0.0",
          },
          {
            to: "/blog/core-v2.0.1/",
            from: "/news/core-v2.0.1",
          },
          {
            to: "/blog/tapto-to-zaparoo/",
            from: "/news/tapto-to-zaparoo",
          },
          {
            to: "/blog/zap-pad-case/",
            from: "/news/zap-pad-case",
          },
          {
            to: "/blog/v1605-repos/",
            from: "/news/v1605-repos",
          },
          {
            to: "/blog/open-zaparoo-app/",
            from: "/news/open-zaparoo-app",
          },
          {
            to: "/blog/designer-url-change/",
            from: "/news/designer-url-change",
          },
          {
            to: "/blog/steamos-beta-release/",
            from: "/news/steamos-beta-release",
          },
          {
            to: "/blog/pcns-choice/",
            from: "/news/pcns-choice",
          },
          {
            to: "/blog/core-and-app-updates/",
            from: "/news/core-and-app-updates",
          },
          {
            to: "/blog/code-of-conduct/",
            from: "/news/code-of-conduct",
          },
          {
            to: "/blog/new-designer-templates/",
            from: "/news/new-designer-templates",
          },
          {
            to: "/blog/new-esp32-ui-overhaul/",
            from: "/news/new-esp32-ui-overhaul",
          },
          {
            to: "/blog/app-v1.5.0/",
            from: "/news/app-v1.5.0",
          },
          {
            to: "/docs/core/tokens/",
            from: "/docs/core/api/tokens",
          },
          // Labels documentation redirects
          {
            to: "/docs/labels/#template-specifications",
            from: "/docs/labels/templates",
          },
          {
            to: "/docs/labels/#upgrade-stickers",
            from: "/docs/labels/upgrade-stickers",
          },
          {
            to: "/docs/community-hub/",
            from: "/docs/community",
          },
          {
            to: "/docs/community-hub/contributors",
            from: "/docs/community/contributors",
          },
          // Barcode reader reorganization
          {
            to: "/docs/readers/barcode/app/",
            from: "/docs/readers/barcode-scanner/",
          },
          // Systems page moved to top-level
          {
            to: "/docs/systems/",
            from: "/docs/core/systems/",
          },
          {
            to: "/docs/community-hub/media",
            from: "/docs/community/media",
          },
          {
            to: "/docs/community-hub/tapto",
            from: "/docs/community/tapto",
          },
          {
            to: "/docs/community-hub/vendors",
            from: "/docs/community/vendors",
          },
          {
            to: "/docs/community-projects/",
            from: "/docs/community/projects",
          },
          {
            to: "/docs/community-projects/diy-reader",
            from: "/docs/community/projects/diy-reader",
          },
          {
            to: "/docs/community-projects/super-zap-boy",
            from: "/docs/community/projects/super-zap-boy",
          },
        ],
      },
    ],
    // Custom image optimization plugin (disabled - breaks MDX image imports)
    // ["./plugins/image-optimization", {}],
    // Performance optimization plugin
    ["./plugins/performance-optimization", {}],
  ],
};

export default config;
