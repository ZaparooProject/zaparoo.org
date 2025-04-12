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
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

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
    image: "img/social-card.png",
    navbar: {
      title: "Zaparoo",
      logo: {
        alt: "Zaparoo Logo",
        src: "img/logo_sm.webp",
      },
      items: [
        { to: "/downloads", label: "Downloads", position: "left" },
        { to: "/projects", label: "Projects", position: "left" },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://design.zaparoo.org/",
          label: "Designer",
          position: "left",
        },
        { href: "https://wiki.zaparoo.org/", label: "Wiki", position: "left" },
        {
          type: 'html',
          position: 'right',
          value: '<div style="display: flex; flex-direction: row; gap: 0.8rem; line-height: 1.25; padding: var(--ifm-menu-link-padding-vertical) var(--ifm-menu-link-padding-horizontal);"><a href="https://zaparoo.org/discord"><div style="display: flex; align-items: center; color: var(--ifm-navbar-link-color)"><svg style="width: 24px; height: 24px; fill: currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg></div></a><a href="https://github.com/ZaparooProject"><div style="display: flex; align-items: center; color: var(--ifm-navbar-link-color)"><svg style="width: 24px; height: 24px; fill: currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg></div></a></div>',
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Projects",
          items: [
            {
              label: "All Projects",
              to: "/projects",
            },
            {
              label: "Designer",
              href: "https://design.zaparoo.org/",
            },
          ],
        },
        {
          title: "Help",
          items: [
            {
              label: "Support",
              to: "/contact",
            },
            {
              label: "Wiki",
              href: "https://wiki.zaparoo.org/",
            },
            {
              label: "Getting Started",
              href: "https://wiki.zaparoo.org/Getting_started",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Contributors",
              href: "https://zaparoo.org/discord",
            },
            {
              label: "Discord",
              href: "https://zaparoo.org/discord",
            },
            {
              label: "Reddit",
              href: "https://reddit.com/r/Zaparoo",
            },
            {
              label: "Lemmy",
              href: "https://lemmy.world/c/zaparoo",
            },
            {
              label: "GitHub",
              href: "https://github.com/ZaparooProject/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "Privacy",
              to: "/privacy",
            },
            {
              label: "Terms",
              to: "/terms",
            },
            {
              label: "Contact",
              to: "/contact",
            },
            {
              label: "Zaparoo.com",
              href: "https://zaparoo.com",
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
  } satisfies Preset.ThemeConfig,

  plugins: [
    () => ({
      name: "umami-tracking",
      injectHtmlTags() {
        return {
          headTags: [
            {
              tagName: "script",
              attributes: {
                href: "https://cloud.umami.is/script.js",
                defer: true,
                "data-website-id": "43f9c3f2-720d-4c28-b4bc-b44808c9a7d1",
              },
            },
          ],
        };
      },
    }),
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "https://discord.gg/jNdWq52rBP",
            from: "/discord",
          },
          {
            to: "https://www.reddit.com/r/Zaparoo/",
            from: "/reddit",
          },
          // old site news redirects
          {
            to: "/blog",
            from: "/news",
          },
          {
            to: "/blog/core-v2.0.0",
            from: "/news/core-v2.0.0",
          },
          {
            to: "/blog/core-v2.0.1",
            from: "/news/core-v2.0.1",
          },
          {
            to: "/blog/tapto-to-zaparoo",
            from: "/news/tapto-to-zaparoo",
          },
          {
            to: "/blog/zap-pad-case",
            from: "/news/zap-pad-case",
          },
          {
            to: "/blog/v1605-repos",
            from: "/news/v1605-repos",
          },
          {
            to: "/blog/open-zaparoo-app",
            from: "/news/open-zaparoo-app",
          },
          {
            to: "/blog/designer-url-change",
            from: "/news/designer-url-change",
          },
          {
            to: "/blog/steamos-beta-release",
            from: "/news/steamos-beta-release",
          },
          {
            to: "/blog/pcns-choice",
            from: "/news/pcns-choice",
          },
          {
            to: "/blog/core-and-app-updates",
            from: "/news/core-and-app-updates",
          },
          {
            to: "/blog/code-of-conduct",
            from: "/news/code-of-conduct",
          },
          {
            to: "/blog/new-designer-templates",
            from: "/news/new-designer-templates",
          },
          {
            to: "/blog/new-esp32-ui-overhaul",
            from: "/news/new-esp32-ui-overhaul",
          },
          {
            to: "/blog/app-v1.5.0",
            from: "/news/app-v1.5.0",
          },
        ],
      },
    ],
  ],
};

export default config;
