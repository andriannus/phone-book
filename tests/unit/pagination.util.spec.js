import { paginate } from "@/shared/utils/pagination";

describe("pagination.util.js", () => {
  let userStub;
  let optionsStub;

  beforeEach(() => {
    userStub = [
      {
        name: {
          title: "Ms",
          first: "Esma",
          last: "Biçer",
        },
        location: {
          street: {
            number: 5949,
            name: "Kushimoto Sk",
          },
          city: "Çankırı",
          state: "Hatay",
          country: "Turkey",
          postcode: 95307,
          coordinates: {
            latitude: "-58.1599",
            longitude: "98.6441",
          },
          timezone: {
            offset: "-4:00",
            description: "Atlantic Time (Canada), Caracas, La Paz",
          },
        },
        email: "esma.bicer@example.com",
        dob: {
          date: "1989-06-04T13:05:17.883Z",
          age: 31,
        },
        registered: {
          date: "2004-04-23T15:45:32.305Z",
          age: 16,
        },
        picture: {
          large: "https://randomuser.me/api/portraits/women/76.jpg",
          medium: "https://randomuser.me/api/portraits/med/women/76.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/women/76.jpg",
        },
        color: "green",
      },
    ];

    optionsStub = {
      limit: 10,
      page: 1,
      total: userStub.length,
    };
  });

  afterEach(() => {
    userStub = [];
    optionsStub = {};
  });

  it("should return paginated data", () => {
    const expectedResult = {
      data: [...userStub],
      meta: {
        page: 1,
        perPage: 10,
        prevPage: null,
        nextPage: null,
        total: 1,
        totalPage: 1,
      },
    };

    expect(paginate(userStub, optionsStub)).toEqual(expectedResult);
  });
});
