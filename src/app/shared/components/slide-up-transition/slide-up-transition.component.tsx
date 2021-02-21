import { defineComponent, Transition } from "vue";

export default defineComponent({
  name: "SlideUpTransition",

  setup(_, { slots }) {
    return (): JSX.Element => (
      <Transition name="SlideUp">{slots.default!()}</Transition>
    );
  },
});
