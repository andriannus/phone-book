import { reactive, watchEffect } from "vue";

import { SortUsersState } from "./sort-users.model";
import { ColorfulUser } from "../colorful-users";

import { UserColor, UserSort } from "@/app/shared/enums/user.enum";

export const useSortUsers = (users: ColorfulUser[], sort: UserSort) => {
  const state = reactive<SortUsersState>({
    users,
    sort,
  });

  const handleUserSort = () => {
    switch (state.sort) {
      case UserSort.City:
        return sortByCity();
      case UserSort.Color:
        return sortByColor();
      default:
        return;
    }
  };

  const sortByCity = () => {
    state.users.sort((a, b) => {
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

  const sortByColor = () => {
    const greenUsers = state.users.filter(user => {
      return user.color === UserColor.Green;
    });

    const blueUsers = state.users.filter(user => {
      return user.color === UserColor.Blue;
    });

    const redUsers = state.users.filter(user => {
      return user.color === UserColor.Red;
    });

    state.users = [...greenUsers, ...blueUsers, ...redUsers];
  };

  watchEffect(() => {
    handleUserSort();
  });

  return state.users;
};
