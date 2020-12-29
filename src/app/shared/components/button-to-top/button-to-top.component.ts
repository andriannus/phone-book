import { defineComponent, onMounted, onUnmounted, reactive } from "vue";

import { ButtonToTopState } from "./button-to-top.model";

import QoaSlideUpTransition from "@/app/shared/components/slide-up-transition/slide-up-transition.component.vue";
import {
  SCROLL_INTERVAL,
  SCROLL_STEP_DIVIDER,
} from "@/app/shared/constants/scroll.constant";

export default defineComponent({
  name: "ButtonToTop",

  components: {
    QoaSlideUpTransition,
  },

  setup() {
    const state = reactive<ButtonToTopState>({
      isShowButton: false,
    });

    onMounted((): void => {
      window.addEventListener("scroll", toggleToTopButton);
    });

    onUnmounted((): void => {
      window.removeEventListener("scroll", toggleToTopButton);
    });

    function toggleToTopButton(): void {
      const { body, documentElement } = document;
      const isValidBody = body.scrollTop > 300;
      const isValidDocumentElement = documentElement.scrollTop > 300;

      state.isShowButton = isValidBody || isValidDocumentElement;
    }

    function onClickButton(): void {
      const scrollStep = -window.scrollY / SCROLL_STEP_DIVIDER;
      const scrollInterval = setInterval((): void => {
        if (window.scrollY === 0) {
          return clearInterval(scrollInterval);
        }

        window.scrollBy(0, scrollStep);
      }, SCROLL_INTERVAL);
    }

    return { onClickButton, state };
  },
});
