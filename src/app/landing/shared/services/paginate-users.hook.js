import { reactive, watchEffect } from "vue";

import { paginate } from "@/shared/utils/pagination";

export const usePaginateUsers = (users, page) => {
  const state = reactive({
    page: parseInt(page),
    paginatedUsers: {},
  });

  const paginateUsers = () => {
    const options = {
      limit: 10,
      page: parseInt(page),
      total: users.length,
    };

    state.paginatedUsers = paginate(users, options);
  };

  watchEffect(() => {
    paginateUsers();
  });

  return state.paginatedUsers;
};
