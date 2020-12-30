import faker from "faker";

import {
  ColorfulUser,
  useColorfulUsers,
} from "@/app/landing/shared/services/colorful-users";

import { UserColor } from "@/app/shared/enums/user.enum";
import { RandomUserData } from "@/app/shared/models/random-user.model";

describe("colorful-users.hook.ts", () => {
  let userStub: RandomUserData;

  beforeEach(() => {
    userStub = {
      name: {
        title: faker.name.title(),
        first: faker.name.firstName(),
        last: faker.name.lastName(),
      },
      location: {
        street: {
          number: faker.random.number(),
          name: faker.address.streetName(),
        },
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        postcode: parseInt(faker.address.zipCodeByState(faker.address.state())),
        coordinates: {
          latitude: faker.address.latitude(),
          longitude: faker.address.longitude(),
        },
        timezone: {
          offset: "-4:00",
          description: "Atlantic Time (Canada), Caracas, La Paz",
        },
      },
      email: faker.internet.email(),
      dob: {
        date: faker.date.past(),
        age: faker.random.number(),
      },
      registered: {
        date: faker.date.past(),
        age: faker.random.number(),
      },
      picture: {
        large: faker.image.imageUrl(),
        medium: faker.image.imageUrl(),
        thumbnail: faker.image.imageUrl(),
      },
    };
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
