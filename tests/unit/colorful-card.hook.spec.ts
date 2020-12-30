import {
  CardClass,
  useColorfulCard,
} from "@/app/landing/shared/services/colorful-card";

import { UserColor } from "@/app/shared/enums/user.enum";

describe("colorful-card.hook.ts", () => {
  it("should return Blue card class when user color is blue", () => {
    const mockCardClass = useColorfulCard(UserColor.Blue);
    expect(mockCardClass).toBe(CardClass.Blue);
  });

  it("should return Green card class when user color is green", () => {
    const mockCardClass = useColorfulCard(UserColor.Green);
    expect(mockCardClass).toBe(CardClass.Green);
  });

  it("should return Red card class when user color is red", () => {
    const mockCardClass = useColorfulCard(UserColor.Red);
    expect(mockCardClass).toBe(CardClass.Red);
  });
});
