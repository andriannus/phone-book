import { shallowMount } from "@vue/test-utils";

import NotFound from "@/app/not-found/not-found.component.vue";

describe("not-found.component.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NotFound);
  });

  it("should create", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
