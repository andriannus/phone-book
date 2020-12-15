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

<script src="./button-to-top.component.js"></script>
<style lang="scss" scoped src="./button-to-top.component.scss"></style>
