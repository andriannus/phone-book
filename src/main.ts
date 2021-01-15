import { createApp } from "vue";

import App from "@/app/app.component.vue";
import router from "@/app/app.routes";

import "./register-service-worker";

createApp(App)
  .use(router)
  .mount("#app");
