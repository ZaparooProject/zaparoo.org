module.exports = function (context, options) {
  return {
    name: 'performance-optimization-plugin',
    injectHtmlTags({content}) {
      return {
        headTags: [
          // Preconnect to critical domains for faster connections
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://fonts.googleapis.com',
            },
          },
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://fonts.gstatic.com',
              crossorigin: 'anonymous',
            },
          },
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