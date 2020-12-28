import { reactive, watchEffect } from "vue";

import { PaginateUsersState } from "./paginate-users.model";

import { RandomUserData } from "@/app/shared/models/random-user.model";
import {
  paginate,
  PaginatedData,
  PaginationOptions,
} from "@/app/shared/utils/pagination";

export const usePaginateUsers = (
  users: RandomUserData[],
  page: string,
): PaginatedData<RandomUserData> => {
  const state = reactive<PaginateUsersState>({
    page: parseInt(page),
    paginatedUsers: {} as PaginatedData<RandomUserData>,
  });

  const paginateUsers = (): void => {
    const options: PaginationOptions = {
      limit: 10,
      page: parseInt(page),
      total: users.length,
    };

    state.paginatedUsers = paginate<RandomUserData>(users, options);
  };

  watchEffect((): void => {
    paginateUsers();
  });

  return state.paginatedUsers;
};
