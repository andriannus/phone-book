export const transformAddress = location => {
  const { city, postcode, state } = location;
  return `${city}, ${state}, ${postcode}`;
};

export const transformFullName = name => {
  const { first, last, title } = name;
  return `${title} ${first} ${last}`;
};
