import { defineComponent, onMounted, onUnmounted, reactive } from "vue";

import QoaSlideUpTransition from "@/app/shared/components/slide-up-transition/slide-up-transition.component.vue";

export default defineComponent({
  name: "ButtonToLeft",

  components: {
    QoaSlideUpTransition,
  },

  props: {
    selector: {
      type: String,
      default: "body",
    },
  },

  setup(props) {
    const state = reactive({
      container: "",
      isShowButton: false,
    });

    onMounted(() => {
      state.container = document.querySelector(props.selector);
      state.container.addEventListener("scroll", toggleToLeftButton);
    });

    onUnmounted(() => {
      state.container.removeEventListener("scroll", toggleToLeftButton);
    });

    const toggleToLeftButton = () => {
      if (!state.container) return;
      state.isShowButton = state.container.scrollLeft >= 900;
    };

    const onClickButton = () => {
      if (!state.container) return;

      state.container.scrollTo({
        left: 0,
      });
    };

    return { onClickButton, state };
  },
});
