import { CardClass } from "./colorful-card.enum";

import { UserColor } from "@/app/shared/enums/user.enum";

export function useColorfulCard(userColor: UserColor): CardClass {
  let colorfulCard: CardClass;

  (function handleCardColor(): void {
    switch (userColor) {
      case UserColor.Red: {
        colorfulCard = CardClass.Red;
        break;
      }
      case UserColor.Green: {
        colorfulCard = CardClass.Green;
        break;
      }
      case UserColor.Blue: {
        colorfulCard = CardClass.Blue;
        break;
      }
      default: {
        colorfulCard = CardClass.Default;
        break;
      }
    }
  })();

  return colorfulCard;
}
