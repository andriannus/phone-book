import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Card",

  props: {
    className: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const hasClassName = computed(() => !!props.className);

    return { hasClassName, props };
  },
});
