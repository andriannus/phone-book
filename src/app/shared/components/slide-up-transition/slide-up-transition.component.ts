import { defineComponent, h, Transition, VNode } from "vue";

export default defineComponent({
  name: "SlideUpTransition",

  setup(_, { slots }) {
    return (): VNode =>
      h(
        Transition,
        {
          name: "SlideUp",
        },
        () => slots.default!(),
      );
  },
});
