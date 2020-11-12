<template>
  <div class="Landing Container" @scroll="onHorizontalScroll">
    <div
      v-for="(user, index) in props.paginatedUsers.data"
      :key="index"
      class="Landing-column"
    >
      <qoa-card :className="cardClassName(user.color)">
        <div class="Landing-image TextAlign-center">
          <img :src="user.picture.thumbnail" alt="Picture" />
        </div>

        <p>
          <strong>{{ fullName(user.name) }}</strong>
        </p>
        <p>{{ user.dob.age }} years old</p>
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

  setup(props, { emit }) {
    const ls = useLocalStorage();

    const state = reactive({
      container: null,
    });

    onMounted(() => {
      state.container = document.querySelector(".Landing");

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
      if (isStillScrollable()) {
        emit("updated", props.paginatedUsers.meta.nextPage);
      }
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

    return { address, cardClassName, fullName, onHorizontalScroll, props };
  },
};
</script>

<style lang="scss" scoped>
.Landing {
  display: flex;
  flex-direction: row;
  margin-bottom: 0;
  margin-top: 1rem;
  min-height: calc(100vh - 56px - 1rem);
  overflow-x: auto;
  padding-bottom: 1rem;

  &-image {
    img {
      border-radius: 50%;
    }
  }

  &-column {
    background-color: whitesmoke;
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
      margin-bottom: 1rem;
    }
  }
}

::-webkit-scrollbar {
  background-color: #f5f5f5;

  &-thumb {
    background-color: #000000;
    border: 2px solid #555555;
  }

  &-track {
    background-color: #f5f5f5;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}
</style>
