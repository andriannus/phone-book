import faker from "faker";

import {
  Location,
  Name,
  RandomUserData,
} from "@/app/shared/models/random-user.model";

export const MOCK_USER_NAME: Name = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  title: faker.name.title(),
};

export const MOCK_USER_LOCATION: Location = {
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
};

export const MOCK_USER_DATA: RandomUserData = {
  name: MOCK_USER_NAME,
  location: MOCK_USER_LOCATION,
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
