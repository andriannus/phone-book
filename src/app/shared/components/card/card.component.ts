import { defineComponent, h, VNode } from "vue";

export default defineComponent({
  name: "Card",

  props: {
    className: {
      type: String,
      default: null,
    },
  },

  setup(props, { slots }) {
    return (): VNode =>
      h(
        "div",
        {
          class: [
            "Card Card--borderless Card--elevated",
            {
              [props.className]: !!props.className,
            },
          ],
        },
        [
          h(
            "div",
            {
              class: "Card-body",
            },
            slots.default!(),
          ),
        ],
      );
  },
});
