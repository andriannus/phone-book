<template>
  <div class="NotFound">
    <p class="FontSize-2xlarge MarginBottom">Page Not Found</p>

    <router-link class="Button Button--primary" to="/landing">
      Take me away
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.NotFound {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}
</style>
