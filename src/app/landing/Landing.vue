<template>
  <div v-if="!state.isDataReady" class="Landing-loading">
    <span>Loading data, please wait...</span>
  </div>

  <div v-else-if="state.didSomethingWrong" class="Landing-error">
    <div class="TextAlign-center">
      <p class="MarginBottom">Something wrong.</p>

      <button
        class="Button Button--primary"
        type="button"
        @click="reloadCurrentPage"
      >
        Reload
      </button>
    </div>
  </div>

  <template v-else>
    <qoa-top-bar @sorted="handleSort"></qoa-top-bar>

    <landing-mobile
      v-if="isMobile"
      :paginatedUsers="state.paginatedUsers"
      @updated="paginateUsers"
    ></landing-mobile>

    <landing-desktop
      v-else
      :paginatedUsers="state.paginatedUsers"
      @updated="paginateUsers"
    ></landing-desktop>
  </template>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import LandingDesktop from "./shared/components/landing-desktop/LandingDesktop.vue";
import LandingMobile from "./shared/components/landing-mobile/LandingMobile.vue";
import { QUERY_PARAMS } from "./shared/constants/landing.constant";
import { useColorfulUsers } from "./shared/services/colorful-users.hook";
import { usePaginateUsers } from "./shared/services/paginate-users.hook";
import { useSortUsers } from "./shared/services/sort-users.hook";

import QoaTopBar from "@/shared/components/top-bar/top-bar.component.vue";
import { QOA_USERS } from "@/shared/constants/storage.constant";
import { useApiInvoker } from "@/shared/services/api-invoker";
import { useLocalStorage } from "@/shared/services/local-storage";

export default {
  name: "Landing",

  components: {
    LandingDesktop,
    LandingMobile,
    QoaTopBar,
  },

  setup() {
    const { apiInvoker } = useApiInvoker();
    const ls = useLocalStorage();
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      clientWidth: document.body.clientWidth,
      didSomethingWrong: false,
      isDataReady: false,
      paginatedUsers: {},
    });

    const queryRef = computed(() => route.query);
    const isMobile = computed(() => state.clientWidth < 768);

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
    });

    const onResize = () => {
      state.clientWidth = document.body.clientWidth;
    };

    const reloadCurrentPage = () => {
      location.reload();
    };

    const paginateUsers = (page = 1) => {
      navigate({ page });

      if (ls.isExist(QOA_USERS)) {
        return getPaginatedUsers();
      }

      fetchPaginatedUsers();
    };

    const handleSort = sortBy => {
      navigate({ sortBy });
    };

    const navigate = query => {
      router.push({
        query: {
          ...route.query,
          ...query,
        },
      });
    };

    const transformRandomUsers = users => {
      const { page = 1, sortBy = "" } = queryRef.value;

      const colorfulUsers = useColorfulUsers(users);
      const sortedUsers = useSortUsers(colorfulUsers, sortBy);
      const paginatedUsers = usePaginateUsers(sortedUsers, page);

      return paginatedUsers;
    };

    const fetchPaginatedUsers = async () => {
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

    const getPaginatedUsers = () => {
      const results = ls.get(QOA_USERS);

      state.paginatedUsers = transformRandomUsers(results);
      state.isDataReady = true;
    };

    const handlePageWithoutQuery = page => {
      router.replace({
        query: { page },
      });
    };

    watchEffect(() => {
      const { page } = queryRef.value;
      const validPage = page || 1;

      if (!page) {
        return handlePageWithoutQuery(validPage);
      }

      paginateUsers(validPage);
    });

    return {
      handleSort,
      isMobile,
      paginateUsers,
      reloadCurrentPage,
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
.Landing {
  &-loading,
  &-error {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    min-height: 100vh;
  }
}
</style>
