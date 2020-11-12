import { transformAddress, transformFullName } from "@/shared/utils/transform";

describe("transform.util.js", () => {
  it("should return full name", () => {
    const userStub = {
      first: "Andre",
      last: "Simamora",
      title: "Mr",
    };
    const expectedResult = "Mr Andre Simamora";

    expect(transformFullName(userStub)).toBe(expectedResult);
  });

  it("should return undefined string full name WHEN parameter is INVALID", () => {
    const userStub = {
      random: "Andre",
    };
    const expectedResult = "undefined undefined undefined";

    expect(transformFullName(userStub)).toBe(expectedResult);
  });

  it("should return address", () => {
    const locationStub = {
      city: "Ciomas",
      postcode: "16610",
      state: "Indonesia",
    };
    const expectedResult = "Ciomas, Indonesia, 16610";

    expect(transformAddress(locationStub)).toBe(expectedResult);
  });

  it("should return undefined string address WHEN parameter is INVALID", () => {
    const locationStub = {
      random: "Sumatera",
    };
    const expectedResult = "undefined, undefined, undefined";

    expect(transformAddress(locationStub)).toBe(expectedResult);
  });
});
