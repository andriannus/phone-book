import { shallowMount } from "@vue/test-utils";

import QoaTopBar from "@/shared/components/top-bar/top-bar.component.vue";

describe("top-bar.component.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(QoaTopBar);
  });

  it("should create", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should emit when color button clicked", () => {
    const sortByColorButton = wrapper.find("#BtnSortByColor");

    sortByColorButton.trigger("click");

    expect(wrapper.emitted("sorted")).toBeTruthy();
  });

  it("should emit with `color` argument when color button clicked", () => {
    const sortByColorButton = wrapper.find("#BtnSortByColor");

    sortByColorButton.trigger("click");

    expect(wrapper.emitted("sorted")[0]).toEqual(["color"]);
  });

  it("should emit when city button clicked", () => {
    const sortByCityButton = wrapper.find("#BtnSortByCity");

    sortByCityButton.trigger("click");

    expect(wrapper.emitted("sorted")).toBeTruthy();
  });

  it("should emit with `city` argument when color button clicked", () => {
    const sortByCityButton = wrapper.find("#BtnSortByCity");

    sortByCityButton.trigger("click");

    expect(wrapper.emitted("sorted")[0]).toEqual(["city"]);
  });
});
