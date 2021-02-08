import { defineComponent, h, VNode } from "vue";
import { RouterLink } from "vue-router";
import { useTitle } from "@vueuse/core";

export default defineComponent({
  name: "NotFound",

  setup() {
    useTitle("Page Not Found | Phone Book");

    return (): VNode =>
      h(
        "div",
        {
          class: "NotFound",
        },
        [
          h(
            "p",
            {
              class: "FontSize-2xlarge MarginBottom",
            },
            "Page Not Found",
          ),

          h(
            RouterLink,
            {
              id: "BtnBackToLanding",
              class: "Button Button--primary",
              to: "/landing",
            },
            () => "Take me away",
          ),
        ],
      );
  },
});
