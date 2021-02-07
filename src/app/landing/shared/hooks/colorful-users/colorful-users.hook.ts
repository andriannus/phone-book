import { reactive } from "vue";

import { ColorfulUser, ColorfulUsersState } from "./colorful-users.model";

import { UserColor } from "@/app/shared/enums/user.enum";
import { RandomUserData } from "@/app/shared/models/random-user.model";

export function useColorfulUsers(users: RandomUserData[]): ColorfulUser[] {
  const state = reactive<ColorfulUsersState>({
    users,
    colorfulUsers: [],
  });

  (function handleUserColors(): void {
    state.colorfulUsers = state.users.map((user: RandomUserData) => {
      let colorfulUser = {} as ColorfulUser;

      switch (true) {
        case user.dob.age < 21: {
          colorfulUser = {
            ...user,
            color: UserColor.Red,
          };

          break;
        }
        case user.dob.age >= 21 && user.dob.age <= 56: {
          colorfulUser = {
            ...user,
            color: UserColor.Green,
          };

          break;
        }
        case user.dob.age > 56: {
          colorfulUser = {
            ...user,
            color: UserColor.Blue,
          };

          break;
        }
        default: {
          break;
        }
      }

      return colorfulUser;
    }) as ColorfulUser[];
  })();

  return state.colorfulUsers;
}
