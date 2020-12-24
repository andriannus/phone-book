module.exports = {
  css: {
    loaderOptions: {
      scss: {
        sassOptions: {
          includePaths: ["./node_modules"],
        },
      },
    },
  },

  chainWebpack(config) {
    config.plugin("html").tap(options => {
      options[0].title = "Phone Book";
      return options;
    });

    if (config.plugins.has("preload")) {
      config.plugin("preload").tap(options => {
        options[0].include = ["app", "landing"];
        return options;
      });
    }
  },
};
