import { reactive, watchEffect } from "vue";

export const useSortUsers = (users, sort) => {
  const state = reactive({
    users,
    sort,
  });

  const handleSort = () => {
    switch (state.sort) {
      case "cities":
        return sortByCity();
      case "color":
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
      return user.color === "green";
    });

    const blueUsers = state.users.filter(user => {
      return user.color === "blue";
    });

    const redUsers = state.users.filter(user => {
      return user.color === "red";
    });

    state.users = [...greenUsers, ...blueUsers, ...redUsers];
  };

  watchEffect(() => {
    handleSort();
  });

  return state.users;
};
