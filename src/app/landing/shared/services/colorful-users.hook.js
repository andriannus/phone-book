import { reactive, watchEffect } from "vue";

export const useColorfulUsers = users => {
  const state = reactive({
    users,
    colorfuledUsers: [],
  });

  const colorfulUsers = () => {
    state.colorfuledUsers = state.users.map(user => {
      switch (true) {
        case user.dob.age < 21:
          return { ...user, color: "red" };
        case user.dob.age >= 21 && user.dob.age <= 56:
          return { ...user, color: "green" };
        case user.dob.age > 56:
          return { ...user, color: "blue" };
        default:
          return;
      }
    });
  };

  watchEffect(() => {
    colorfulUsers();
  });

  return state.colorfuledUsers;
};
