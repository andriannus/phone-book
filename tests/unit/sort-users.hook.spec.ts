import { ColorfulUser } from "@/app/landing/shared/services/colorful-users";
import { useSortUsers } from "@/app/landing/shared/services/sort-users";

import { UserColor, UserSort } from "@/app/shared/enums/user.enum";

describe("sort-users.hook.ts", () => {
  let usersStub: ColorfulUser[];

  beforeEach(() => {
    usersStub = [
      {
        location: {
          city: "Jakarta",
        },
        color: UserColor.Blue,
      },
      {
        location: {
          city: "Bogor",
        },
        color: UserColor.Green,
      },
      {
        location: {
          city: "Depok",
        },
        color: UserColor.Red,
      },
    ] as ColorfulUser[];
  });

  afterEach(() => {
    usersStub = [] as ColorfulUser[];
  });

  it("should sort by city when second parameter is city", () => {
    const expectedResult = [
      {
        location: {
          city: "Bogor",
        },
        color: UserColor.Green,
      },
      {
        location: {
          city: "Depok",
        },
        color: UserColor.Red,
      },
      {
        location: {
          city: "Jakarta",
        },
        color: UserColor.Blue,
      },
    ];
    const mockUser = useSortUsers(usersStub, UserSort.City);

    expect(mockUser).toEqual(expectedResult);
  });

  it("should sort by color when second parameter is color", () => {
    const expectedResult = [
      {
        location: {
          city: "Bogor",
        },
        color: UserColor.Green,
      },
      {
        location: {
          city: "Jakarta",
        },
        color: UserColor.Blue,
      },
      {
        location: {
          city: "Depok",
        },
        color: UserColor.Red,
      },
    ];
    const mockUser = useSortUsers(usersStub, UserSort.Color);

    expect(mockUser).toEqual(expectedResult);
  });
});
