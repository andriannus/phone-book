import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";

import { LandingState, LandingUrlQuery } from "./landing.model";
import LandingDesktop from "./shared/components/landing-desktop/landing-desktop.component.vue";
import LandingMobile from "./shared/components/landing-mobile/landing-mobile.component.vue";
import { QUERY_PARAMS } from "./shared/constants/landing.constant";
import { useColorfulUsers } from "./shared/services/colorful-users";
import { usePaginateUsers } from "./shared/services/paginate-users";
import { useSortUsers } from "./shared/services/sort-users";

import QoaTopBar from "@/app/shared/components/top-bar/top-bar.component.vue";
import { QOA_USERS } from "@/app/shared/constants/storage.constant";
import { UserSort } from "@/app/shared/enums/user.enum";
import { RandomUserData } from "@/app/shared/models/random-user.model";
import { useApiInvoker } from "@/app/shared/services/api-invoker";
import { useLocalStorage } from "@/app/shared/services/local-storage";
import { PaginatedData } from "@/app/shared/utils/pagination";

export default defineComponent({
  name: "Landing",

  components: {
    LandingDesktop,
    LandingMobile,
    QoaTopBar,
  },

  setup() {
    const { apiInvoker } = useApiInvoker({});
    const ls = useLocalStorage();
    const route = useRoute();
    const router = useRouter();

    const state = reactive<LandingState>({
      clientWidth: document.body.clientWidth,
      didSomethingWrong: false,
      isDataReady: false,
      paginatedUsers: {} as PaginatedData<RandomUserData>,
    });

    const queryRef = computed(() => route.query);
    const isMobile = computed(() => state.clientWidth < 768);

    onMounted((): void => {
      window.addEventListener("resize", onResize);
    });

    onUnmounted((): void => {
      window.removeEventListener("resize", onResize);
    });

    const onResize = (): void => {
      state.clientWidth = document.body.clientWidth;
    };

    const reloadCurrentPage = (): void => {
      location.reload();
    };

    const paginateUsers = (page: string = "1"): void => {
      navigate({ page });

      if (ls.isExist(QOA_USERS)) {
        return getPaginatedUsers();
      }

      fetchPaginatedUsers();
    };

    const handleSort = (sortBy: UserSort): void => {
      navigate({ sortBy });
    };

    const navigate = (query: LandingUrlQuery): void => {
      router.push({
        query: {
          ...route.query,
          ...query,
        },
      });
    };

    const transformRandomUsers = (
      users: RandomUserData[],
    ): PaginatedData<RandomUserData> => {
      const { page = "1", sortBy = "" } = queryRef.value;

      const colorfulUsers = useColorfulUsers(users);
      const sortedUsers = useSortUsers(colorfulUsers, sortBy as UserSort);
      const paginatedUsers = usePaginateUsers(sortedUsers, page as string);

      return paginatedUsers;
    };

    const fetchPaginatedUsers = async (): Promise<void> => {
      try {
        const { data: Data } = await apiInvoker.get(QUERY_PARAMS);

        state.paginatedUsers = transformRandomUsers(Data.results);
        ls.set(QOA_USERS, Data.results);
      } catch {
        state.didSomethingWrong = true;
      } finally {
        state.isDataReady = true;
      }
    };

    const getPaginatedUsers = (): void => {
      const results = ls.get(QOA_USERS);

      state.paginatedUsers = transformRandomUsers(results);
      state.isDataReady = true;
    };

    const handlePageWithoutQuery = (page: string): void => {
      router.replace({
        query: { page },
      });
    };

    watchEffect((): void => {
      const { page = "" } = queryRef.value;
      const validPage = page || "1";

      if (!page) {
        return handlePageWithoutQuery(validPage as string);
      }

      paginateUsers(validPage as string);
    });

    return {
      handleSort,
      isMobile,
      paginateUsers,
      reloadCurrentPage,
      state,
    };
  },
});
