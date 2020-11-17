<template>
  <transition name="SlideUp">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "QoaSlideUpTransition",
};
</script>

<style lang="scss" scoped>
.SlideUp {
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
