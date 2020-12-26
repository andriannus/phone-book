import { reactive, watchEffect } from "vue";

import { CARD_CLASS, USER_COLOR } from "../constants/landing.constant";

export const useColorfulCard = userColor => {
  const state = reactive({
    colorfulCard: "",
  });

  const handleCardColor = () => {
    switch (userColor) {
      case USER_COLOR.red:
        state.colorfulCard = CARD_CLASS.red;
        return;
      case USER_COLOR.green:
        state.colorfulCard = CARD_CLASS.green;
        return;
      case USER_COLOR.blue:
        state.colorfulCard = CARD_CLASS.blue;
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
