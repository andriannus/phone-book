import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
} from "vue";

import { LandingDesktopState } from "./landing-desktop.model";
import { useColorfulCard } from "../../services/colorful-card";

import QoaButtonToLeft from "@/app/shared/components/button-to-left/button-to-left.component.vue";
import QoaCard from "@/app/shared/components/card/card.component.vue";
import { UPDATED } from "@/app/shared/constants/emit.constant";
import { QOA_POSITION_X } from "@/app/shared/constants/storage.constant";
import { UserColor } from "@/app/shared/enums/user.enum";
import {
  Location,
  Name,
  RandomUserData,
} from "@/app/shared/models/random-user.model";
import { useLocalStorage } from "@/app/shared/services/local-storage";
import { debounce } from "@/app/shared/utils/debounce";
import { PaginatedData } from "@/app/shared/utils/pagination";
import {
  transformAddress,
  transformFullName,
} from "@/app/shared/utils/transform";

export default defineComponent({
  name: "LandingDesktop",

  components: {
    QoaButtonToLeft,
    QoaCard,
  },

  props: {
    paginatedUsers: {
      type: Object as PropType<PaginatedData<RandomUserData>>,
      default: () => {
        return {};
      },
    },
  },

  emits: [UPDATED],

  setup(props, { emit }) {
    const ls = useLocalStorage();

    const state = reactive<LandingDesktopState>({
      container: null,
    });

    onMounted((): void => {
      state.container = document.querySelector(".LandingDesktop");
      state.container?.addEventListener("wheel", onMouseWheel);

      if (ls.isExist(QOA_POSITION_X)) {
        scrollToLastPosition();
      }
    });

    onUnmounted((): void => {
      state.container?.removeEventListener("wheel", onMouseWheel);
    });

    const onMouseWheel = (e: Event): void => {
      const isGoRight = (e as WheelEvent).deltaY > 0;

      if (isGoRight) {
        state.container!.scrollLeft += 100;
        return;
      }

      state.container!.scrollLeft -= 100;
    };

    const scrollToLastPosition = (): void => {
      state.container?.scrollTo({
        left: ls.get(QOA_POSITION_X),
      });
    };

    const isStillScrollable = (): boolean => {
      const rightOfPage =
        state.container!.scrollWidth - state.container!.clientWidth - 100;

      return state.container!.scrollLeft >= rightOfPage;
    };

    const onHorizontalScroll = debounce((): void => {
      ls.set(QOA_POSITION_X, state.container?.scrollLeft);

      if (!props.paginatedUsers.meta.nextPage || !isStillScrollable()) return;

      emit(UPDATED, props.paginatedUsers.meta.nextPage);
    }, 250);

    const fullName = (name: Name): string => {
      return transformFullName(name);
    };

    const address = (location: Location): string => {
      return transformAddress(location);
    };

    const cardClassName = (userColor: UserColor): string => {
      const className = "LandingDesktop-card";
      const colorfulCard = useColorfulCard(userColor);

      return `${className} ${colorfulCard}`;
    };

    return { address, cardClassName, fullName, onHorizontalScroll };
  },
});
