export interface RandomUserData {
  dob: Dob;
  email: string;
  location: Location;
  name: Name;
  picture: Picture;
  registered: Registered;
}

export interface Dob {
  age: number;
  date: Date;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Timezone {
  description: string;
  offset: string;
}

export interface Location {
  city: string;
  coordinates: Coordinates;
  country: string;
  postcode: number;
  state: string;
  street: Street;
  timezone: Timezone;
}

export interface Name {
  first: string;
  last: string;
  title: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Registered {
  age: number;
  date: Date;
}
