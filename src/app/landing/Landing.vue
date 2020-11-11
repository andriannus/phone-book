<template>
  <qoa-top-bar @sorted="handleSort"></qoa-top-bar>

  <template v-if="isReady">
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
    const isReady = ref(false);
    const isFirstMounted = ref(false);
    const paginatedUsers = ref({});

    const queryRef = computed(() => route.query);
    const isMobile = computed(() => clientWidth.value < 768);

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
    });

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
          isReady.value = true;

          ls.set(QOA_USERS, results);
        })
        .catch(() => {
          console.log("Something wrong.");
        });
    };

    const getPaginatedUsers = () => {
      const results = ls.get(QOA_USERS);

      paginatedUsers.value = transformRandomUsers(results);
      isReady.value = true;
    };

    watchEffect(() => {
      const { page = 1 } = queryRef.value;

      if (!isFirstMounted.value) {
        isFirstMounted.value = true;
      }

      paginateUsers(page);
    });

    return {
      handleSort,
      isReady,
      paginateUsers,
      paginatedUsers,
      isMobile,
    };
  },
};
</script>
