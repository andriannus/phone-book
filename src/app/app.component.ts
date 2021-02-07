import { defineComponent, h, resolveComponent, VNode } from "vue";

import "./app.component.scss";

export default defineComponent({
  name: "App",

  setup() {
    const RouterView = resolveComponent("RouterView");
    return (): VNode => h(RouterView);
  },
});
