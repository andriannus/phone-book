<template>
  <teleport to="body">
    <qoa-slide-up-transition>
      <button
        v-if="state.isShowButton"
        class="ButtonToLeft Button Button--dark Button--rounded Button--elevated"
        @click="onClickButton"
      >
        Give me back to the left
      </button>
    </qoa-slide-up-transition>
  </teleport>
</template>

<script src="./button-to-left.component.js"></script>
<style lang="scss" scoped src="./button-to-left.component.scss"></style>
