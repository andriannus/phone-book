import { defineComponent } from "vue";
import { useTitle } from "@vueuse/core";

export default defineComponent({
  name: "NotFound",

  setup() {
    useTitle("Page Not Found | Phone Book");
  },
});
