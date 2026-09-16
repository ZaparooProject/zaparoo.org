module.exports = function (context, options) {
  return {
    name: 'performance-optimization-plugin',
    injectHtmlTags({content}) {
      return {
        headTags: [
          // Preload critical resources
          {
            tagName: 'link',
            attributes: {
              rel: 'dns-prefetch',
              href: 'https://design.zaparoo.org',
            },
          },
          {
            tagName: 'link',
            attributes: {
              rel: 'dns-prefetch',
              href: 'https://github.com',
            },
          },
        ],
      };
    },
    configureWebpack(config, isServer) {
      return {};
    },
  };
};