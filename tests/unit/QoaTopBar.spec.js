import { shallowMount } from "@vue/test-utils";

import QoaTopBar from "@/shared/components/qoa-top-bar/QoaTopBar.vue";

describe("QoaTopBar.vue", () => {
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

  it("should emit when cities button clicked", () => {
    const sortByCitiesButton = wrapper.find("#BtnSortByCities");

    sortByCitiesButton.trigger("click");

    expect(wrapper.emitted("sorted")).toBeTruthy();
  });

  it("should emit with `cities` argument when color button clicked", () => {
    const sortByCitiesButton = wrapper.find("#BtnSortByCities");

    sortByCitiesButton.trigger("click");

    expect(wrapper.emitted("sorted")[0]).toEqual(["cities"]);
  });
});
