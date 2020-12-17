import { reactive, watchEffect } from "vue";

import { USER_COLOR } from "../constants/landing.constant";

export const useColorfulCard = userColor => {
  const state = reactive({
    colorfulCard: "",
  });

  const handleCardColor = () => {
    switch (userColor) {
      case USER_COLOR.red:
        state.colorfulCard = "BgColor-danger";
        return;
      case USER_COLOR.green:
        state.colorfulCard = "BgColor-primary";
        return;
      case USER_COLOR.blue:
        state.colorfulCard = "BgColor-secondary";
        return;
      default:
        return;
    }
  };

  watchEffect(() => {
    handleCardColor();
  });

  return state.colorfulCard;
};
