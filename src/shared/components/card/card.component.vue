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

<script src="./card.component.js"></script>
