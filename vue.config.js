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

  pwa: {
    name: "Phone Book",
    themeColor: "#48a801",
    manifestOptions: {
      background_color: "#ffffff",
      description: "Qoala's Front End Test Case",
      short_name: "Phone Book",
      shortcuts: [
        {
          name: "Open Sort by Color",
          short_name: "Sort by Color",
          description: "View a phone book that has been sorted by color",
          url: "/landing?page=1&sortBy=color",
          icons: [
            {
              src: "/img/icons/android-chrome-192x192.png",
              sizes: "192x192",
            },
          ],
        },
        {
          name: "Open Sort by City",
          short_name: "Sort by City",
          description: "View a phone book that has been sorted by city",
          url: "/landing?page=1&sortBy=city",
          icons: [
            {
              src: "/img/icons/android-chrome-192x192.png",
              sizes: "192x192",
            },
          ],
        },
      ],
    },
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },

  chainWebpack(config) {
    config.plugin("html").tap(options => {
      options[0].title = "Phone Book";
      return options;
    });
  },
};
