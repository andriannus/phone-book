<template>
  <div v-if="!isDataReady" class="Landing-loading">
    <span>Loading data, please wait...</span>
  </div>

  <div v-else-if="didSomethingWrong" class="Landing-error">
    <div class="TextAlign-center">
      <p class="MarginBottom-base">Something wrong.</p>
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
      :paginatedUsers="paginatedUsers"
      @updated="paginateUsers"
    ></landing-mobile>

    <landing-desktop
      v-else
      :paginatedUsers="paginatedUsers"
      @updated="paginateUsers"
    ></landing-desktop>
  </template>
</template>

<script>
import { computed, ref, onMounted, onUnmounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import LandingDesktop from "./shared/components/landing-desktop/LandingDesktop.vue";
import LandingMobile from "./shared/components/landing-mobile/LandingMobile.vue";
import { QUERY_PARAMS } from "./shared/constants/landing.constant";
import { useColorfulUsers } from "./shared/services/colorful-users.hook";
import { usePaginateUsers } from "./shared/services/paginate-users.hook";
import { useSortUsers } from "./shared/services/sort-users.hook";

import QoaTopBar from "@/shared/components/qoa-top-bar/QoaTopBar";
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

    const clientWidth = ref(document.body.clientWidth);
    const didSomethingWrong = ref(false);
    const isDataReady = ref(false);
    const paginatedUsers = ref({});

    const queryRef = computed(() => route.query);
    const isMobile = computed(() => clientWidth.value < 768);

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
    });

    const reloadCurrentPage = () => {
      location.reload();
    };

    const onResize = () => {
      clientWidth.value = document.body.clientWidth;
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

      const colorfuledUsers = useColorfulUsers(users);
      const sortedUsers = useSortUsers(colorfuledUsers, sortBy);
      const paginatedUsers = usePaginateUsers(sortedUsers, page);

      return paginatedUsers;
    };

    const fetchPaginatedUsers = () => {
      apiInvoker
        .get(QUERY_PARAMS)
        .then(res => {
          const { results } = res.data;

          paginatedUsers.value = transformRandomUsers(results);

          ls.set(QOA_USERS, results);
        })
        .catch(() => {
          didSomethingWrong.value = true;
        })
        .finally(() => {
          isDataReady.value = true;
        });
    };

    const getPaginatedUsers = () => {
      const results = ls.get(QOA_USERS);

      paginatedUsers.value = transformRandomUsers(results);
      isDataReady.value = true;
    };

    const handlePageWithoutQuery = page => {
      router.replace({
        query: { page },
      });
    };

    watchEffect(() => {
      const { page } = queryRef.value;
      const hasPageQuery = !page;
      const validPage = page || 1;

      if (hasPageQuery) {
        return handlePageWithoutQuery(validPage);
      }

      paginateUsers(validPage);
    });

    return {
      didSomethingWrong,
      handleSort,
      isMobile,
      isDataReady,
      paginateUsers,
      paginatedUsers,
      reloadCurrentPage,
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
