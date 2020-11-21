import { shallowMount } from "@vue/test-utils";

import NotFound from "@/app/not-found/NotFound.vue";

describe("NotFound.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NotFound);
  });

  it("should create", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
