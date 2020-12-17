import { reactive, watchEffect } from "vue";

import { USER_COLOR } from "../constants/landing.constant";

export const useColorfulUsers = users => {
  const state = reactive({
    users,
    colorfulUsers: [],
  });

  const handleUserColors = () => {
    state.colorfulUsers = state.users.map(user => {
      switch (true) {
        case user.dob.age < 21:
          return { ...user, color: USER_COLOR.red };
        case user.dob.age >= 21 && user.dob.age <= 56:
          return { ...user, color: USER_COLOR.green };
        case user.dob.age > 56:
          return { ...user, color: USER_COLOR.blue };
        default:
          return;
      }
    });
  };

  watchEffect(() => {
    handleUserColors();
  });

  return state.colorfulUsers;
};
