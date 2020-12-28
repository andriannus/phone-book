import { Location, Name } from "@/app/shared/models/random-user.model";

export const transformAddress = (location: Location): string => {
  const { city, postcode, state } = location;
  return `${city}, ${state}, ${postcode}`;
};

export const transformFullName = (name: Name): string => {
  const { first, last, title } = name;
  return `${title} ${first} ${last}`;
};
