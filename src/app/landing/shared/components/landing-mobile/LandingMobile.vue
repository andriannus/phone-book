<template>
  <div class="Landing Container">
    <qoa-card
      v-for="(user, index) in paginatedUsers.data"
      :key="index"
      :className="cardClassName(user.color)"
    >
      <div class="Flex MarginBottom-base">
        <div class="Landing-image MarginRight-base">
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
          <p class="MarginBottom-xsmall">{{ fullName(user.name) }}</p>
          <p class="MarginBottom-xsmall">{{ user.dob.age }} years old</p>
          <p>{{ user.email }}</p>
        </div>
      </div>

      <p>{{ address(user.location) }}</p>
    </qoa-card>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive } from "vue";

import QoaCard from "@/shared/components/qoa-card/QoaCard";
import { QOA_POSITION_Y } from "@/shared/constants/storage.constant";
import { useLocalStorage } from "@/shared/services/local-storage";
import { transformAddress, transformFullName } from "@/shared/utils/transform";
import { debounce } from "@/shared/utils/debounce";

export default {
  name: "LandingMobile",

  components: {
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

  setup(props, { emit }) {
    const ls = useLocalStorage();

    const state = reactive({
      container: null,
      scrollTop: 0,
    });

    onMounted(() => {
      state.container = document.querySelector(".Landing");
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

    const cardClassName = color => {
      const className = "Landing-card";

      switch (color) {
        case "red":
          return `${className} BgColor-danger`;
        case "green":
          return `${className} BgColor-primary`;
        case "blue":
          return `${className} BgColor-secondary`;
        default:
          return;
      }
    };

    return { address, cardClassName, fullName, props };
  },
};
</script>

<style lang="scss" scoped>
@import "@amar-ui-web/responsive/scss/mixins";

.Landing {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

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
