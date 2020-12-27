<template>
  <div class="LandingMobile Container">
    <qoa-card
      v-for="(user, index) in paginatedUsers.data"
      :key="index"
      :className="cardClassName(user.color)"
    >
      <div class="Flex MarginBottom">
        <div class="LandingMobile-image MarginRight">
          <img
            alt="Picture"
            class="BgColor-light"
            height="48"
            loading="lazy"
            :src="user.picture.thumbnail"
            width="48"
          />
        </div>

        <div>
          <p class="MarginBottom-xsmall">
            <strong>{{ fullName(user.name) }}</strong>
          </p>

          <p class="MarginBottom-xsmall">
            {{ user.dob.age }}
            <em>years old</em>
          </p>

          <p>{{ user.email }}</p>
        </div>
      </div>

      <p>{{ address(user.location) }}</p>
    </qoa-card>
  </div>

  <qoa-button-to-top></qoa-button-to-top>
</template>

<script lang="ts" src="./landing-mobile.component.ts"></script>
<style lang="scss" scoped src="./landing-mobile.component.scss"></style>
