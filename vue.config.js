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
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      const [arg] = args;
      arg.title = "Phone Book";

      return args;
    });
  },
};
