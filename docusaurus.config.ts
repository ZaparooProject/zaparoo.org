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
        { to: "/projects", label: "Projects", position: "left" },
        { to: "/downloads", label: "Downloads", position: "left" },
        { to: "/blog", label: "Blog", position: "left" },
        { href: "https://wiki.zaparoo.org/", label: "Wiki", position: "left" },
        {
          href: "https://design.zaparoo.org/",
          label: "Designer",
          position: "left",
        },
        {
          href: "https://zaparoo.com",
          label: "Zaparoo.com",
          position: "left",
          target: "_blank",
        },
        {
          href: "https://github.com/ZaparooProject",
          label: "GitHub",
          position: "right",
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
