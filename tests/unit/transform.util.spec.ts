import faker from "faker";

import { Location, Name } from "@/app/shared/models/random-user.model";
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
    } as Name;
    const expectedResult = `${userStub.title} ${userStub.first} ${userStub.last}`;

    expect(transformFullName(userStub)).toBe(expectedResult);
  });

  it("should return undefined string full name WHEN parameter is INVALID", () => {
    const userStub = {
      random: faker.random.alpha(),
    } as any;
    const expectedResult = "undefined undefined undefined";

    expect(transformFullName(userStub)).toBe(expectedResult);
  });

  it("should return address", () => {
    const locationStub = {
      city: faker.address.city(),
      postcode: parseInt(faker.address.zipCodeByState(faker.address.state())),
      state: faker.address.state(),
    } as Location;
    const expectedResult = `${locationStub.city}, ${locationStub.state}, ${locationStub.postcode}`;

    expect(transformAddress(locationStub)).toBe(expectedResult);
  });

  it("should return undefined string address WHEN parameter is INVALID", () => {
    const locationStub = {
      random: faker.random.alpha(),
    } as any;
    const expectedResult = "undefined, undefined, undefined";

    expect(transformAddress(locationStub)).toBe(expectedResult);
  });
});
