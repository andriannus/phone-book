import { reactive, watchEffect } from "vue";

import { PaginateUsersState } from "./paginate-users.model";

import { RandomUserData } from "@/app/shared/models/random-user.model";
import {
  paginate,
  PaginatedData,
  PaginationOptions,
} from "@/app/shared/utils/pagination";

export function usePaginateUsers(
  users: RandomUserData[],
  page: string,
): PaginatedData<RandomUserData> {
  const state = reactive<PaginateUsersState>({
    page: parseInt(page),
    paginatedUsers: {} as PaginatedData<RandomUserData>,
  });

  watchEffect((): void => {
    paginateUsers();
  });

  function paginateUsers(): void {
    const options: PaginationOptions = {
      limit: 10,
      page: parseInt(page),
      total: users.length,
    };

    state.paginatedUsers = paginate<RandomUserData>(users, options);
  }

  return state.paginatedUsers;
}
