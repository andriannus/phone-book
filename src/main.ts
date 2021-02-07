import { createApp } from "vue";

import { App, router } from "@/app";

import "./register-service-worker";

createApp(App)
  .use(router)
  .mount("#app");
