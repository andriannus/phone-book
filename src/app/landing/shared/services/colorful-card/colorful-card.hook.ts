import { reactive, watchEffect } from "vue";

import { CardClass } from "./colorful-card.enum";
import { ColorfulCardState } from "./colorful-card.model";

import { UserColor } from "@/app/shared/enums/user.enum";

export function useColorfulCard(userColor: UserColor): CardClass {
  const state = reactive<ColorfulCardState>({
    colorfulCard: CardClass.Default,
  });

  watchEffect((): void => {
    handleCardColor();
  });

  function handleCardColor(): void {
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
  }

  return state.colorfulCard;
}
