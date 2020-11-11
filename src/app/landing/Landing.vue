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

import { QUERY_PARAMS } from "./shared/constants/landing.constant";
import LandingDesktop from "./shared/components/landing-desktop/LandingDesktop.vue";
import LandingMobile from "./shared/components/landing-mobile/LandingMobile.vue";

import QoaTopBar from "@/shared/components/qoa-top-bar/QoaTopBar";
import { QOA_USERS } from "@/shared/constants/storage.constant";
import { useApiInvoker } from "@/shared/services/api-invoker";
import { useLocalStorage } from "@/shared/services/local-storage";
import { paginate } from "@/shared/utils/pagination";

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
    const paginatedUsers = ref({});

    const queryParamsRef = computed(() => route.query);
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
      router.push({
        query: {
          ...route.query,
          page,
        },
      });

      if (ls.isExist(QOA_USERS)) {
        return getPaginatedUsers(page);
      }

      fetchPaginatedUsers(page);
    };

    const handleSort = sortBy => {
      router.push({
        query: {
          ...route.query,
          sortBy,
        },
      });
    };

    const sortUsers = users => {
      let sortedUsers = [...users];
      const { sortBy = "" } = queryParamsRef.value;

      if (sortBy === "color") {
        const greenUsers = sortedUsers.filter(user => {
          return user.color === "green";
        });

        const blueUsers = sortedUsers.filter(user => {
          return user.color === "blue";
        });

        const redUsers = sortedUsers.filter(user => {
          return user.color === "red";
        });

        return [...greenUsers, ...blueUsers, ...redUsers];
      }

      if (sortBy === "cities") {
        sortedUsers.sort((a, b) => {
          const cityA = a.location.city.toUpperCase();
          const cityB = b.location.city.toUpperCase();

          if (cityA < cityB) {
            return -1;
          }

          if (cityA > cityB) {
            return 1;
          }

          return 0;
        });
      }

      return sortedUsers;
    };

    const fetchPaginatedUsers = page => {
      apiInvoker
        .get(QUERY_PARAMS)
        .then(res => {
          const { results } = res.data;
          const colorfuledUsers = colorfulUsers(results);
          const sortedUsers = sortUsers(colorfuledUsers);
          const options = {
            limit: 10,
            page: parseInt(page),
            total: results.length,
          };

          ls.set(QOA_USERS, colorfuledUsers);
          paginatedUsers.value = paginate(sortedUsers, options);
          isReady.value = true;
        })
        .catch(() => {
          console.log("Something wrong.");
        });
    };

    const getPaginatedUsers = page => {
      const results = ls.get(QOA_USERS);
      const colorfuledUsers = colorfulUsers(results);
      const sortedUsers = sortUsers(colorfuledUsers);
      const options = {
        limit: 10,
        page: parseInt(page),
        total: results.length,
      };

      paginatedUsers.value = paginate(sortedUsers, options);
      isReady.value = true;
    };

    const colorfulUsers = users => {
      const colorfuledUsers = users.map(user => {
        switch (true) {
          case user.dob.age < 21:
            return {
              ...user,
              color: "red",
            };
          case user.dob.age >= 21 && user.dob.age <= 56:
            return {
              ...user,
              color: "green",
            };
          case user.dob.age > 56:
            return {
              ...user,
              color: "blue",
            };
        }
      });

      return colorfuledUsers;
    };

    watchEffect(() => {
      const { page = 1 } = queryParamsRef.value;
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
