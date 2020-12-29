import { reactive, watchEffect } from "vue";

import { CardClass } from "./colorful-card.enum";
import { ColorfulCardState } from "./colorful-card.model";

import { UserColor } from "@/app/shared/enums/user.enum";

export const useColorfulCard = (userColor: UserColor): CardClass => {
  const state = reactive<ColorfulCardState>({
    colorfulCard: CardClass.Default,
  });

  const handleCardColor = (): void => {
    switch (userColor) {
      case UserColor.Red: {
        state.colorfulCard = CardClass.Red;
        return;
      }
      case UserColor.Green: {
        state.colorfulCard = CardClass.Green;
        return;
      }
      case UserColor.Blue: {
        state.colorfulCard = CardClass.Blue;
        return;
      }
      default: {
        return;
      }
    }
  };

  watchEffect((): void => {
    handleCardColor();
  });

  return state.colorfulCard;
};
