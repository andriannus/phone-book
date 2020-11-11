<template>
  <qoa-top-bar></qoa-top-bar>

  <div v-if="isReady" class="Landing Container">
    <qoa-card
      v-for="(user, index) in paginatedUsers.data"
      :key="index"
      :className="getCardClassName(user.color)"
    >
      <p>{{ getFullName(user.name) }}</p>
      <p>{{ user.dob.age }} tahun</p>
      <p>{{ getAddress(user.location) }}</p>
      <p>{{ user.email }}</p>
    </qoa-card>

    <button
      v-if="paginatedUsers.meta.nextPage"
      class="Button Button--primary"
      type="button"
      @click="paginateUsers(paginatedUsers.meta.nextPage)"
    >
      Load More
    </button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

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

    const isReady = ref(false);
    const paginatedUsers = ref({});
    const isSort = ref({
      color: false,
      cities: false,
    });

    onMounted(() => {
      paginateUsers();
    });

    const paginateUsers = (page = 1) => {
      if (ls.isExist(QOA_USERS)) {
        return getPaginatedUsers(page);
      }

      fetchPaginatedUsers(page);
    };

    const sortUsers = users => {
      let sortedUsers = [...users];

      if (isSort.value.color) {
        //
      }

      if (isSort.value.cities) {
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
        page,
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

    return {
      getAddress,
      getCardClassName,
      getFullName,
      isReady,
      paginateUsers,
      paginatedUsers,
    };
  },
};
</script>

<style lang="scss" scoped>
.Landing {
  display: flex;
  margin-top: 1rem;
  min-height: calc(100vh - 56px - 1rem);
  overflow-x: auto;

  &-card {
    min-width: 350px;
    height: 100%;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
