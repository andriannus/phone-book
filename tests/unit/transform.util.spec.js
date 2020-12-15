import faker from "faker";

import {
  transformAddress,
  transformFullName,
} from "@/app/shared/utils/transform";

describe("transform.util.js", () => {
  it("should return full name", () => {
    const userStub = {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      title: faker.name.title(),
    };
    const expectedResult = `${userStub.title} ${userStub.first} ${userStub.last}`;

    expect(transformFullName(userStub)).toBe(expectedResult);
  });

  it("should return undefined string full name WHEN parameter is INVALID", () => {
    const userStub = {
      random: faker.random.alpha(),
    };
    const expectedResult = "undefined undefined undefined";

    expect(transformFullName(userStub)).toBe(expectedResult);
  });

  it("should return address", () => {
    const locationStub = {
      city: faker.address.city(),
      postcode: faker.address.zipCodeByState(),
      state: faker.address.state(),
    };
    const expectedResult = `${locationStub.city}, ${locationStub.state}, ${locationStub.postcode}`;

    expect(transformAddress(locationStub)).toBe(expectedResult);
  });

  it("should return undefined string address WHEN parameter is INVALID", () => {
    const locationStub = {
      random: faker.random.alpha(),
    };
    const expectedResult = "undefined, undefined, undefined";

    expect(transformAddress(locationStub)).toBe(expectedResult);
  });
});
