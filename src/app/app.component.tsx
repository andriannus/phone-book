import { defineComponent } from "vue";
import { RouterView } from "vue-router";

import "./app.component.scss";

export default defineComponent({
  name: "App",

  setup() {
    return (): JSX.Element => <RouterView />;
  },
});
