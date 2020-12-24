import { createApp } from "vue";

import App from "@/app/app.component.vue";
import router from "@/app/app.routes";

createApp(App)
  .use(router)
  .mount("#app");
