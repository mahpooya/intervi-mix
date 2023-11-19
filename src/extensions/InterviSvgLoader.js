const defaults = {
  fileLoaderDirs: {
    images: "images",
    fonts:  "fonts",
  },

  imgLoaderOptions: {
    enabled:  true,
    gifsicle: {},
    mozjpeg:  {},
    optipng:  {},
    svgo:     {},
  },

  resourceRoot: "/",
};

class InterviSvgLoader
{
  name() {
    return 'useInterviSvgLoader';
  }

  register(config) {
    this.config = {...defaults, ...config};
  }

  webpackRules() {
    return [
      {
        test:  /\.svg$/,
        oneOf: [
          {
            issuer: /\.(ts|js)x?$/,
            loader: '@svgr/webpack',
          },
          {
            issuer: /\.(sass|scss|less|css)$/,
            use:    [
              {
                loader:  'file-loader',
                options: {
                  name:       this.config.fileLoaderDirs.images + '/[name].[ext]?[contenthash]',
                  publicPath: this.config.resourceRoot,
                }
              },
              {
                loader:  'img-loader',
                options: this.config.imgLoaderOptions,
              }
            ]
          }
        ]
      }
    ];
  }

  webpackConfig(config) {
    config.module.rules.forEach((rule) => {
      if (rule.test) {
        if (('' + rule.test).indexOf('|^((?!font).)*\\.svg$') > -1) {
          rule.test = /\.(png|jpe?g|gif|webp)$/;
        }

        if (('' + rule.test).indexOf('|font.*\\.svg$') > -1) {
          rule.test = /\.(woff2?|ttf|eot|otf)$/;
        }
      }
    });
  }
}

module.exports = InterviSvgLoader;
