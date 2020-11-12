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
          id="BtnSortByCities"
          class="Button Button--primary Button--outlined"
          type="button"
          @click="sortUser('cities')"
        >
          Cities
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QoaTopBar",

  setup(_, { emit }) {
    const sortUser = value => {
      emit("sorted", value);
    };

    return { sortUser };
  },
};
</script>

<style lang="scss" scoped>
.TopBar {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
