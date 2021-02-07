import { reactive } from "vue";

import { SortUsersState } from "./sort-users.model";
import { ColorfulUser } from "../colorful-users";

import { UserColor, UserSort } from "@/app/shared/enums/user.enum";

export function useSortUsers(
  users: ColorfulUser[],
  sort: UserSort,
): ColorfulUser[] {
  const state = reactive<SortUsersState>({
    users,
    sort,
  });

  (function handleUserSort(): void {
    switch (state.sort) {
      case UserSort.City: {
        sortByCity();
        break;
      }
      case UserSort.Color: {
        sortByColor();
        break;
      }
      default: {
        break;
      }
    }
  })();

  function sortByCity(): void {
    state.users.sort((a: ColorfulUser, b: ColorfulUser): 1 | -1 | 0 => {
      const cityA = a.location.city.toUpperCase();
      const cityB = b.location.city.toUpperCase();

      if (cityA < cityB) return -1;
      if (cityA > cityB) return 1;

      return 0;
    });
  }

  function sortByColor(): void {
    const greenUsers = state.users.filter((user: ColorfulUser): boolean => {
      return user.color === UserColor.Green;
    });

    const blueUsers = state.users.filter((user: ColorfulUser): boolean => {
      return user.color === UserColor.Blue;
    });

    const redUsers = state.users.filter((user: ColorfulUser): boolean => {
      return user.color === UserColor.Red;
    });

    state.users = [...greenUsers, ...blueUsers, ...redUsers];
  }

  return state.users;
}
