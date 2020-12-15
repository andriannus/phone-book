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

<script>
import { onMounted, onUnmounted, reactive } from "vue";

import { useColorfulCard } from "../../services/colorful-card.hook";

import QoaButtonToTop from "@/shared/components/qoa-button-to-top/QoaButtonToTop.vue";
import QoaCard from "@/shared/components/qoa-card/QoaCard.vue";
import { QOA_POSITION_Y } from "@/shared/constants/storage.constant";
import { useLocalStorage } from "@/shared/services/local-storage";
import { transformAddress, transformFullName } from "@/shared/utils/transform";
import { debounce } from "@/shared/utils/debounce";

export default {
  name: "LandingMobile",

  components: {
    QoaButtonToTop,
    QoaCard,
  },

  props: {
    paginatedUsers: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  emits: ["updated"],

  setup(props, { emit }) {
    const ls = useLocalStorage();

    const state = reactive({
      container: null,
      scrollTop: 0,
    });

    onMounted(() => {
      state.container = document.querySelector(".LandingMobile");
      window.addEventListener("scroll", onVerticalScroll);

      if (ls.isExist(QOA_POSITION_Y)) {
        scrollToLastPosition();
      }
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onVerticalScroll);
    });

    const scrollToLastPosition = () => {
      state.container.scrollTo({
        top: ls.get(QOA_POSITION_Y),
      });
    };

    const isStillScrollable = () => {
      const bottomOfPage =
        state.container.scrollHeight - window.screen.height - 100;

      return state.scrollTop >= bottomOfPage;
    };

    const onVerticalScroll = debounce(() => {
      const { body, documentElement } = document;
      state.scrollTop = body.scrollTop || documentElement.scrollTop;

      ls.set(QOA_POSITION_Y, state.scrollTop);

      if (!props.paginatedUsers.meta.nextPage) return;
      if (!isStillScrollable()) return;

      emit("updated", props.paginatedUsers.meta.nextPage);
    }, 250);

    const fullName = name => {
      return transformFullName(name);
    };

    const address = location => {
      return transformAddress(location);
    };

    const cardClassName = userColor => {
      const className = "LandingMobile-card";
      const colorfulCard = useColorfulCard(userColor);

      return `${className} ${colorfulCard}`;
    };

    return { address, cardClassName, fullName, props };
  },
};
</script>

<style lang="scss" scoped>
@import "@amar-ui-web/responsive/scss/mixins";

.LandingMobile {
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
  word-break: break-all;

  &-card {
    p {
      line-height: 1rem;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  &-image {
    img {
      border-radius: 50%;
    }
  }
}
</style>
