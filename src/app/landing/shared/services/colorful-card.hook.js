import { reactive, watchEffect } from "vue";

export const useColorfulCard = userColor => {
  const state = reactive({
    colorfulCard: "",
  });

  const handleCardColor = () => {
    switch (userColor) {
      case "red":
        state.colorfulCard = "BgColor-danger";
        return;
      case "green":
        state.colorfulCard = "BgColor-primary";
        return;
      case "blue":
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
