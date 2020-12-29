import { reactive, watchEffect } from "vue";

import { ColorfulUser, ColorfulUsersState } from "./colorful-users.model";

import { UserColor } from "@/app/shared/enums/user.enum";
import { RandomUserData } from "@/app/shared/models/random-user.model";

export function useColorfulUsers(users: RandomUserData[]): ColorfulUser[] {
  const state = reactive<ColorfulUsersState>({
    users,
    colorfulUsers: [],
  });

  watchEffect((): void => {
    handleUserColors();
  });

  function handleUserColors(): void {
    state.colorfulUsers = state.users.map((user: RandomUserData) => {
      switch (true) {
        case user.dob.age < 21: {
          return {
            ...user,
            color: UserColor.Red,
          };
        }
        case user.dob.age >= 21 && user.dob.age <= 56: {
          return {
            ...user,
            color: UserColor.Green,
          };
        }
        case user.dob.age > 56: {
          return {
            ...user,
            color: UserColor.Blue,
          };
        }
        default: {
          return;
        }
      }
    }) as ColorfulUser[];
  }

  return state.colorfulUsers;
}
