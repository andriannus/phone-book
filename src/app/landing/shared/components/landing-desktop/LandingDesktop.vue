<template>
  <div class="LandingDesktop Container" @scroll="onHorizontalScroll">
    <div
      v-for="(user, index) in props.paginatedUsers.data"
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
</template>

<script>
import { onMounted, reactive } from "vue";

import QoaCard from "@/shared/components/qoa-card/QoaCard";
import { QOA_POSITION_X } from "@/shared/constants/storage.constant";
import { useLocalStorage } from "@/shared/services/local-storage";
import { transformAddress, transformFullName } from "@/shared/utils/transform";
import { debounce } from "@/shared/utils/debounce";

export default {
  name: "LandingDesktop",

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

  emits: ["updated"],

  setup(props, { emit }) {
    const ls = useLocalStorage();

    const state = reactive({
      container: null,
    });

    onMounted(() => {
      state.container = document.querySelector(".LandingDesktop");

      if (ls.isExist(QOA_POSITION_X)) {
        scrollToLastPosition();
      }
    });

    const scrollToLastPosition = () => {
      state.container.scrollTo({
        left: ls.get(QOA_POSITION_X),
      });
    };

    const isStillScrollable = () => {
      const rightOfPage =
        state.container.scrollWidth - state.container.clientWidth - 100;

      return state.container.scrollLeft >= rightOfPage;
    };

    const onHorizontalScroll = debounce(() => {
      ls.set(QOA_POSITION_X, state.container.scrollLeft);

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
      const className = "LandingDesktop-card";

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

    return { address, cardClassName, fullName, onHorizontalScroll, props };
  },
};
</script>

<style lang="scss" scoped>
@import "@amar-ui-web/color/scss/variables";

.LandingDesktop {
  display: flex;
  flex-direction: row;
  margin-bottom: 0;
  margin-top: 1rem;
  min-height: calc(100vh - 56px - 1rem);
  overflow-x: auto;
  padding-bottom: 1rem;
  word-break: break-all;

  &-image {
    img {
      border-radius: 50%;
    }
  }

  &-column {
    background-color: $amb-neutral-10;
    border-radius: 0.5rem;
    padding: 1rem;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  &-card {
    height: auto;
    min-width: 350px;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    *:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
}

::-webkit-scrollbar {
  background-color: $amb-neutral-20;

  &-thumb {
    background-color: $amb-neutral-90;
  }

  &-track {
    background-color: $amb-neutral-10;
    box-shadow: inset 0 0 6px $amb-neutral-60;
  }
}
</style>
