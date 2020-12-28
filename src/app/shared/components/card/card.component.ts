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
    const cardClassName = computed((): { [x: string]: boolean } => {
      return {
        [props.className]: !!props.className,
      };
    });

    return { cardClassName };
  },
});
