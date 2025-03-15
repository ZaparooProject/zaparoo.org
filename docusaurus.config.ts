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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
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
        src: "img/logo.png",
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
        ],
      },
    ],
  ],
};

export default config;
