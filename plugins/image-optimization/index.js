module.exports = function (context, options) {
  return {
    name: 'image-optimization-plugin',
    configureWebpack(config, isServer) {
      // Simple configuration focusing on image asset handling
      return {
        module: {
          rules: [
            {
              test: /\.(jpe?g|png|gif|webp|avif)$/i,
              type: 'asset/resource',
              generator: {
                filename: 'assets/images/[name].[contenthash:8][ext]',
              },
            },
          ],
        },
      };
    },
  };
};