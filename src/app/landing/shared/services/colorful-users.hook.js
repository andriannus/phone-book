import { reactive, watchEffect } from "vue";

export const useColorfulUsers = users => {
  const state = reactive({
    users,
    colorfulUsers: [],
  });

  const handleUserColors = () => {
    state.colorfulUsers = state.users.map(user => {
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
    handleUserColors();
  });

  return state.colorfulUsers;
};
