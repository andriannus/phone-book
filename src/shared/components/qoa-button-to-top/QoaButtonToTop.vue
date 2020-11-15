<template>
  <teleport to="body">
    <qoa-slide-up-transition>
      <button
        v-if="isShowButton"
        class="ButtonToTop Button Button--dark Button--rounded Button--elevated"
        @click="onClickButton"
      >
        Take me to fly up
      </button>
    </qoa-slide-up-transition>
  </teleport>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

import QoaSlideUpTransition from "@/shared/transitions/QoaSlideUpTransition.vue";

export default {
  name: "QoaButtonToTop",

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
};
</script>

<style lang="scss" scoped>
.ButtonToTop {
  bottom: 1rem;
  left: 0;
  margin: auto;
  position: fixed;
  right: 0;
  width: 11rem;
}
</style>
