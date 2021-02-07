<template>
  <div class="LandingDesktop Container" @scroll="onHorizontalScroll">
    <div
      v-for="(user, index) in paginatedUsers.data"
      :key="index"
      class="LandingDesktop-column"
    >
      <qoa-card :class-name="cardClassName(user.color)">
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
        <p>
          <code>{{ user.email }}</code>
        </p>
      </qoa-card>
    </div>
  </div>

  <qoa-button-to-left selector=".LandingDesktop"></qoa-button-to-left>
</template>

<script lang="ts" src="./landing-desktop.component.ts"></script>
