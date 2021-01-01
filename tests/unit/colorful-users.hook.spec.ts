import { MOCK_USER_DATA } from "./mocks/user.mock";

import {
  ColorfulUser,
  useColorfulUsers,
} from "@/app/landing/shared/services/colorful-users";
import { UserColor } from "@/app/shared/enums/user.enum";
import { RandomUserData } from "@/app/shared/models/random-user.model";

describe("colorful-users.hook.ts", () => {
  let userStub: RandomUserData;

  beforeEach(() => {
    userStub = MOCK_USER_DATA;
  });

  afterEach(() => {
    userStub = {} as RandomUserData;
  });

  it("should set red color when user's age < 21", () => {
    userStub.dob.age = 20;

    const expectedResult: ColorfulUser[] = [
      {
        ...userStub,
        color: UserColor.Red,
      },
    ];
    const mockUser = useColorfulUsers([userStub]);

    expect(mockUser).toEqual(expectedResult);
  });

  it("should set green color when user's age >= 21 and age <= 56", () => {
    userStub.dob.age = 22;

    const expectedResult: ColorfulUser[] = [
      {
        ...userStub,
        color: UserColor.Green,
      },
    ];
    const mockUser = useColorfulUsers([userStub]);

    expect(mockUser).toEqual(expectedResult);
  });

  it("should set blue color when user's age > 56", () => {
    userStub.dob.age = 57;

    const expectedResult: ColorfulUser[] = [
      {
        ...userStub,
        color: UserColor.Blue,
      },
    ];
    const mockUser = useColorfulUsers([userStub]);

    expect(mockUser).toEqual(expectedResult);
  });
});
