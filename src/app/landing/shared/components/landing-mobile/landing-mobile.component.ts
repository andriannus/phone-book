import { defineComponent, onMounted, onUnmounted, reactive } from "vue";

import { LandingMobileState } from "./landing-mobile.model";
import { useColorfulCard } from "../../services/colorful-card";

import QoaButtonToTop from "@/app/shared/components/button-to-top/button-to-top.component.vue";
import QoaCard from "@/app/shared/components/card/card.component.vue";
import { UPDATED } from "@/app/shared/constants/emit.constant";
import { QOA_POSITION_Y } from "@/app/shared/constants/storage.constant";
import { UserColor } from "@/app/shared/enums/user.enum";
import { Location, Name } from "@/app/shared/models/random-user.model";
import { useLocalStorage } from "@/app/shared/services/local-storage";
import {
  transformAddress,
  transformFullName,
} from "@/app/shared/utils/transform";
import { debounce } from "@/app/shared/utils/debounce";

export default defineComponent({
  name: "LandingMobile",

  components: {
    QoaButtonToTop,
    QoaCard,
  },

  props: {
    paginatedUsers: {
      type: Object,
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
      state.container?.scrollTo({
        top: ls.get(QOA_POSITION_Y),
      });
    };

    const isStillScrollable = () => {
      const bottomOfPage =
        state.container!.scrollHeight - window.screen.height - 100;

      return state.scrollTop >= bottomOfPage;
    };

    const onVerticalScroll = debounce(() => {
      const { body, documentElement } = document;
      state.scrollTop = body.scrollTop || documentElement.scrollTop;

      ls.set(QOA_POSITION_Y, state.scrollTop);

      if (!props.paginatedUsers.meta.nextPage || !isStillScrollable()) return;

      emit(UPDATED, props.paginatedUsers.meta.nextPage);
    }, 250);

    const fullName = (name: Name) => {
      return transformFullName(name);
    };

    const address = (location: Location) => {
      return transformAddress(location);
    };

    const cardClassName = (userColor: UserColor) => {
      const className = "LandingMobile-card";
      const colorfulCard = useColorfulCard(userColor);

      return `${className} ${colorfulCard}`;
    };

    return { address, cardClassName, fullName };
  },
});