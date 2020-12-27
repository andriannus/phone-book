import faker from "faker";

import { UserColor } from "@/app/shared/enums/user.enum";
import { ColorfulUser } from "@/app/landing/shared/services/colorful-users";
import { paginate, PaginatonOptions } from "@/app/shared/utils/pagination";

describe("pagination.util.js", () => {
  let userStub: ColorfulUser;
  let optionsStub: PaginatonOptions;

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
      color: UserColor.Blue,
    };

    optionsStub = {
      limit: 10,
      page: 1,
      total: 1,
    };
  });

  afterEach(() => {
    userStub = {} as ColorfulUser;
    optionsStub = {} as PaginatonOptions;
  });

  it("should return paginated data", () => {
    const mockPaginatedUsers = paginate([userStub], optionsStub);
    const expectedResult = {
      data: [userStub],
      meta: {
        page: 1,
        perPage: 10,
        prevPage: null,
        nextPage: null,
        total: 1,
        totalPage: 1,
      },
    };

    expect(mockPaginatedUsers).toEqual(expectedResult);
  });
});
