import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
} from "vue";

import { LandingMobileState } from "./landing-mobile.model";
import { useColorfulCard } from "../../services/colorful-card";

import QoaButtonToTop from "@/app/shared/components/button-to-top/button-to-top.component.vue";
import QoaCard from "@/app/shared/components/card/card.component.vue";
import { UPDATED } from "@/app/shared/constants/emit.constant";
import { QOA_POSITION_Y } from "@/app/shared/constants/storage.constant";
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
  name: "LandingMobile",

  components: {
    QoaButtonToTop,
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

    const state = reactive<LandingMobileState>({
      container: null,
      scrollTop: 0,
    });

    onMounted((): void => {
      state.container = document.querySelector(".LandingMobile");
      window.addEventListener("scroll", onVerticalScroll);

      if (ls.isExist(QOA_POSITION_Y)) {
        scrollToLastPosition();
      }
    });

    onUnmounted((): void => {
      window.removeEventListener("scroll", onVerticalScroll);
    });

    const scrollToLastPosition = (): void => {
      state.container?.scrollTo({
        top: ls.get<number>(QOA_POSITION_Y),
      });
    };

    const isStillScrollable = (): boolean => {
      const bottomOfPage =
        state.container!.scrollHeight - window.screen.height - 100;

      return state.scrollTop >= bottomOfPage;
    };

    const onVerticalScroll = debounce((): void => {
      const { body, documentElement } = document;
      state.scrollTop = body.scrollTop || documentElement.scrollTop;

      ls.set(QOA_POSITION_Y, state.scrollTop);

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
      const className = "LandingMobile-card";
      const colorfulCard = useColorfulCard(userColor);

      return `${className} ${colorfulCard}`;
    };

    return { address, cardClassName, fullName };
  },
});
