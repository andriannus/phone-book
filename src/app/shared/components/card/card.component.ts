import { defineComponent, h, VNode } from "vue";

export default defineComponent({
  name: "Card",

  setup(_, { slots }) {
    return (): VNode =>
      h(
        "div",
        {
          class: "Card Card--borderless Card--elevated",
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
