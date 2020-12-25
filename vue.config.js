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
  },
};
