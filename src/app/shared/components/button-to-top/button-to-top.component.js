import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import QoaSlideUpTransition from "@/app/shared/components/slide-up-transition/slide-up-transition.component.vue";

export default defineComponent({
  name: "ButtonToTop",

  components: {
    QoaSlideUpTransition,
  },

  setup() {
    const isShowButton = ref(false);

    onMounted(() => {
      window.addEventListener("scroll", toggleToTopButton);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", toggleToTopButton);
    });

    const toggleToTopButton = () => {
      const { body, documentElement } = document;
      const isValidBody = body.scrollTop > 300;
      const isValidDocumentElement = documentElement.scrollTop > 300;

      isShowButton.value = isValidBody || isValidDocumentElement;
    };

    const onClickButton = () => {
      const scrollStep = -window.scrollY / (500 / 15);
      const scrollInterval = setInterval(() => {
        if (window.scrollY === 0) {
          return clearInterval(scrollInterval);
        }

        window.scrollBy(0, scrollStep);
      }, 15);
    };

    return { isShowButton, onClickButton };
  },
});
