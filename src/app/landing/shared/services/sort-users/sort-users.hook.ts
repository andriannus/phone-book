import { reactive, watchEffect } from "vue";

import { SortUsersState } from "./sort-users.model";
import { ColorfulUser } from "../colorful-users";

import { UserColor, UserSort } from "@/app/shared/enums/user.enum";

export const useSortUsers = (
  users: ColorfulUser[],
  sort: UserSort,
): ColorfulUser[] => {
  const state = reactive<SortUsersState>({
    users,
    sort,
  });

  const handleUserSort = (): void => {
    switch (state.sort) {
      case UserSort.City:
        return sortByCity();
      case UserSort.Color:
        return sortByColor();
      default:
        return;
    }
  };

  const sortByCity = (): void => {
    state.users.sort((a: ColorfulUser, b: ColorfulUser): 1 | -1 | 0 => {
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
  };

  const sortByColor = (): void => {
    const greenUsers = state.users.filter((user: ColorfulUser) => {
      return user.color === UserColor.Green;
    });

    const blueUsers = state.users.filter((user: ColorfulUser) => {
      return user.color === UserColor.Blue;
    });

    const redUsers = state.users.filter((user: ColorfulUser) => {
      return user.color === UserColor.Red;
    });

    state.users = [...greenUsers, ...blueUsers, ...redUsers];
  };

  watchEffect((): void => {
    handleUserSort();
  });

  return state.users;
};
