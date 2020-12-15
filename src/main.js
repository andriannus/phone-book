import { createApp } from "vue";

import App from "@/app.component.vue";
import router from "@/app.routes";
import "@/app.component.scss";

createApp(App)
  .use(router)
  .mount("#app");
