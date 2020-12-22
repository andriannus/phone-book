<template>
  <div class="LandingDesktop Container" @scroll="onHorizontalScroll">
    <div
      v-for="(user, index) in paginatedUsers.data"
      :key="index"
      class="LandingDesktop-column"
    >
      <qoa-card :className="cardClassName(user.color)">
        <div class="LandingDesktop-image TextAlign-center">
          <img
            alt="Picture"
            class="BgColor-light"
            height="48"
            loading="lazy"
            :src="user.picture.thumbnail"
            width="48"
          />
        </div>

        <p>
          <strong>{{ fullName(user.name) }}</strong>
        </p>

        <p>
          {{ user.dob.age }}
          <em>years old</em>
        </p>

        <p>{{ address(user.location) }}</p>
        <p>{{ user.email }}</p>
      </qoa-card>
    </div>
  </div>

  <qoa-button-to-left selector=".LandingDesktop"></qoa-button-to-left>
</template>

<script src="./landing-desktop.component.js"></script>
<style lang="scss" scoped src="./landing-desktop.component.scss"></style>
