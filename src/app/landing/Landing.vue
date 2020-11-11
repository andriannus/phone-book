<template>
  <qoa-top-bar @sorted="handleSort"></qoa-top-bar>

  <div v-if="isReady" class="Landing Container" @scroll="handleScroll">
    <template v-if="!isMobile">
      <qoa-card
        v-for="(user, index) in paginatedUsers.data"
        :key="index"
        :className="getCardClassName(user.color)"
      >
        <div class="Landing-image TextAlign-center">
          <img :src="user.picture.thumbnail" alt="Picture" />
        </div>

        <p>{{ getFullName(user.name) }}</p>
        <p>{{ user.dob.age }} tahun</p>
        <p>{{ getAddress(user.location) }}</p>
        <p>{{ user.email }}</p>
      </qoa-card>
    </template>

    <template v-else>
      <qoa-card
        v-for="(user, index) in paginatedUsers.data"
        :key="index"
        :className="getCardClassName(user.color)"
      >
        <div class="Flex MarginBottom-base">
          <div class="MarginRight-base">
            <img :src="user.picture.thumbnail" alt="Picture" />
          </div>

          <div>
            <p>{{ getFullName(user.name) }}</p>
            <p>{{ user.dob.age }} tahun</p>
            <p>{{ user.email }}</p>
          </div>
        </div>

        <p>{{ getAddress(user.location) }}</p>
      </qoa-card>
    </template>

    <button
      v-if="paginatedUsers.meta.nextPage"
      id="BtnLoadMore"
      class="Button Button--primary"
      type="button"
      @click="paginateUsers(paginatedUsers.meta.nextPage)"
    >
      Load More
    </button>
  </div>
</template>

<script>
import { computed, ref, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import { QUERY_PARAMS } from "./shared/constants/landing.constant";

import QoaCard from "@/shared/components/qoa-card/QoaCard";
import QoaTopBar from "@/shared/components/qoa-top-bar/QoaTopBar";
import { QOA_USERS } from "@/shared/constants/storage.constant";
import { useApiInvoker } from "@/shared/services/api-invoker";
import { useLocalStorage } from "@/shared/services/local-storage";
import { paginate } from "@/shared/utils/pagination";

export default {
  name: "Landing",

  components: {
    QoaCard,
    QoaTopBar,
  },

  setup() {
    const { apiInvoker } = useApiInvoker();
    const ls = useLocalStorage();
    const route = useRoute();
    const router = useRouter();
    const queryParamsRef = computed(() => route.query);
    const clientWidth = ref(document.body.clientWidth);
    const isMobile = computed(() => {
      return clientWidth.value < 768;
    });

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    const onResize = () => {
      clientWidth.value = document.body.clientWidth;
    };

    const isReady = ref(false);
    const paginatedUsers = ref({});

    const handleScroll = () => {
      if (!isReady.value) return;
      if (!paginatedUsers.value.meta.nextPage) return;

      const { left } = document
        .getElementById("BtnLoadMore")
        .getBoundingClientRect();

      if (left <= document.body.offsetWidth) {
        console.log("RUN BOOY");
        // paginateUsers(paginatedUsers.value.meta.nextPage);
      }
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
            page,
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

    const getFullName = name => {
      const { first, last, title } = name;
      return `${title} ${first} ${last}`;
    };

    const getAddress = location => {
      const { city, postcode, state } = location;

      return `${city}, ${state}, ${postcode}`;
    };

    const getCardClassName = color => {
      let className = "Landing-card";

      if (color === "red") {
        return `${className} BgColor-danger`;
      }

      if (color === "green") {
        return `${className} BgColor-primary`;
      }

      return `${className} BgColor-secondary`;
    };

    watchEffect(() => {
      const { page = 1 } = queryParamsRef.value;
      paginateUsers(page);
    });

    return {
      getAddress,
      getCardClassName,
      getFullName,
      handleSort,
      isReady,
      paginateUsers,
      handleScroll,
      paginatedUsers,
      isMobile,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@amar-ui-web/responsive/scss/mixins";

.Landing {
  margin-top: 1rem;

  @include amb-responsive-media("xs") {
    display: flex;
    flex-direction: column;

    &-card {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }

  @include amb-responsive-media("md") {
    display: flex;
    min-height: calc(100vh - 56px - 1rem);
    flex-direction: row;
    overflow-x: auto;

    &-card {
      min-width: 350px;
      height: 100%;

      *:not(:last-child) {
        margin-bottom: 1rem;
      }

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
}
</style>
