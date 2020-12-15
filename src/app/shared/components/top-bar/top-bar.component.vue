<template>
  <div class="TopBar">
    <div class="TopBar-logo">
      <span class="FontSize-large Color-secondary-60">
        <strong>Qoala Test</strong>
      </span>
    </div>

    <div class="TopBar-actions">
      <div class="TopBar-action">
        <button
          id="BtnSortByColor"
          class="Button Button--primary Button--outlined"
          type="button"
          @click="sortUser('color')"
        >
          Color
        </button>
      </div>

      <div class="TopBar-action">
        <button
          id="BtnSortByCity"
          class="Button Button--primary Button--outlined"
          type="button"
          @click="sortUser('city')"
        >
          City
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./top-bar.component.js"></script>
<style lang="scss" scoped src="./top-bar.component.scss"></style>
