<template>
  <teleport to="body">
    <qoa-slide-up-transition>
      <button
        v-if="state.isShowButton"
        class="ButtonToTop Button Button--dark Button--rounded Button--elevated"
        @click="onClickButton"
      >
        Take me to fly up
      </button>
    </qoa-slide-up-transition>
  </teleport>
</template>

<script lang="ts" src="./button-to-top.component.ts"></script>
