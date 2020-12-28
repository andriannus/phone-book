import { reactive, watchEffect } from "vue";

import { PaginateUsersState } from "./paginate-users.model";

import { RandomUserData } from "@/app/shared/models/random-user.model";
import { paginate, PaginatedData } from "@/app/shared/utils/pagination";

export const usePaginateUsers = (
  users: RandomUserData[],
  page: string,
): PaginatedData<RandomUserData> => {
  const state = reactive<PaginateUsersState>({
    page: parseInt(page),
    paginatedUsers: {} as PaginatedData<RandomUserData>,
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
