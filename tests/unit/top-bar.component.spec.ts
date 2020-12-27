import { shallowMount, VueWrapper } from "@vue/test-utils";

import QoaTopBar from "@/app/shared/components/top-bar/top-bar.component.vue";
import { SORTED } from "@/app/shared/constants/emit.constant";

describe("top-bar.component.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(QoaTopBar);
  });

  it("should create", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should emit when color button clicked", () => {
    const sortByColorButton = wrapper.find("#BtnSortByColor");

    sortByColorButton.trigger("click");

    expect(wrapper.emitted(SORTED)).toBeTruthy();
  });

  it("should emit with `color` argument when color button clicked", () => {
    const sortByColorButton = wrapper.find("#BtnSortByColor");

    sortByColorButton.trigger("click");

    expect(wrapper.emitted(SORTED)[0]).toEqual(["color"]);
  });

  it("should emit when city button clicked", () => {
    const sortByCityButton = wrapper.find("#BtnSortByCity");

    sortByCityButton.trigger("click");

    expect(wrapper.emitted(SORTED)).toBeTruthy();
  });

  it("should emit with `city` argument when color button clicked", () => {
    const sortByCityButton = wrapper.find("#BtnSortByCity");

    sortByCityButton.trigger("click");

    expect(wrapper.emitted(SORTED)[0]).toEqual(["city"]);
  });
});
