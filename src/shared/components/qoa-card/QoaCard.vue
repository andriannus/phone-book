<template>
  <div
    :class="{ [props.className]: hasClassName }"
    class="Card Card--borderless Card--elevated"
  >
    <div class="Card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "QoaCard",

  props: {
    className: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const hasClassName = computed(() => !!props.className);

    return { hasClassName, props };
  },
};
</script>
