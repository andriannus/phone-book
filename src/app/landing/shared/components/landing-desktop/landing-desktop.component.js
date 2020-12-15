import { defineComponent, onMounted, onUnmounted, reactive } from "vue";

import { useColorfulCard } from "../../services/colorful-card.hook";

import QoaCard from "@/shared/components/card/card.component.vue";
import { QOA_POSITION_X } from "@/shared/constants/storage.constant";
import { useLocalStorage } from "@/shared/services/local-storage";
import { transformAddress, transformFullName } from "@/shared/utils/transform";
import { debounce } from "@/shared/utils/debounce";

export default defineComponent({
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
      state.container.addEventListener("wheel", onMouseWheel);

      if (ls.isExist(QOA_POSITION_X)) {
        scrollToLastPosition();
      }
    });

    onUnmounted(() => {
      state.container.removeEventListener("wheel", onMouseWheel);
    });

    const onMouseWheel = e => {
      const isGoRight = e.deltaY > 0;

      if (isGoRight) {
        state.container.scrollLeft += 100;
        return;
      }

      state.container.scrollLeft -= 100;
    };

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

    const cardClassName = userColor => {
      const className = "LandingDesktop-card";
      const colorfulCard = useColorfulCard(userColor);

      return `${className} ${colorfulCard}`;
    };

    return { address, cardClassName, fullName, onHorizontalScroll, props };
  },
});
