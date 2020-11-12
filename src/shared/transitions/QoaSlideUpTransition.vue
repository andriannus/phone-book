<template>
  <transition name="slide-up">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "MySlideUpTransition",
};
</script>

<style lang="scss" scoped>
.slide-up {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(100px);
    opacity: 0;
  }
}
</style>
