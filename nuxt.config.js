import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Simple Chat",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Just chat with a friend.",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/errorText"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://github.com/Developmint/nuxt-webfontloader#readme
    "nuxt-webfontloader",
    // https://www.npmjs.com/package/@nuxtjs/dayjs
    "@nuxtjs/dayjs",
    // https://ngrok.nuxtjs.org/
    "@nuxtjs/ngrok",
    // https://nuxt-socket-io.netlify.app/
    "nuxt-socket-io",
    // https://github.com/nuxt/nuxt.js/tree/dev/examples/with-sockets
    "~/io",
  ],
  // Font config
  webfontloader: {
    google: {
      families: ["Montserrat:wght@100;200;300;400;500;600;700&display=swap"],
    },
  },
  // Nuxt-socket io config
  io: {
    sockets: [
      {
        default: true,
        name: "home",
        vuex: {
          mutations: [
            {
              "user-list": "user/SetUserList",
            },
          ],
        },
      },
    ],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: "Simple CHat",
      author: "Behon Baker",
      description: "Just chat with a friend.",
      theme_color: "#21e6c1",
    },
    manifest: {
      lang: "en",
      name: "Simple Chat",
      description: "Just chat with a friend.",
      short_name: "Simple Chat",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    defaultAssets: {
      font: {
        family: "Montserrat",
      },
    },
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: "#21e6c1",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        dark: {
          primary: "#21e6c1",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // Env
  env: {
    WS_URL: process.env.WS_URL,
  },
};
