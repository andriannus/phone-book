import { Location, Name } from "@/app/shared/models/random-user.model";

export function transformAddress(location: Location): string {
  const { city, postcode, state } = location;
  return `${city}, ${state}, ${postcode}`;
}

export function transformFullName(name: Name): string {
  const { first, last, title } = name;
  return `${title} ${first} ${last}`;
}
