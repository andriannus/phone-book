import { shallowMount, VueWrapper } from "@vue/test-utils";

import { NotFound } from "@/app/not-found";

describe("not-found.component.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(NotFound);
  });

  it("should create", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
