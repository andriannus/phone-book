import { createApp } from "vue";

import App from "@/app/app.component.vue";
import "@/app/app.component.scss";
import router from "@/app/app.routes";

createApp(App)
  .use(router)
  .mount("#app");
