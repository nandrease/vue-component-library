import { shallowMount, Wrapper } from "@vue/test-utils";
import BaseIcon from "@/elements/BaseIcon.vue";

let wrapper: Wrapper<Vue>;

const propsData = {
  icon: "icon-search-16"
};

beforeEach(() => (wrapper = shallowMount(BaseIcon, { propsData })));
afterEach(() => wrapper.destroy());

describe("<ScoroIcon />", () => {
  it("renders and displays properly", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("has a use element with defined icon name and size", () => {
    const useElem = wrapper.find("use");
    expect(useElem.attributes("href")).toContain(propsData.icon);
  });

  it("prperly detects size from icon and uses it as a class on wrapper", () => {
    expect(wrapper.classes()).toContain("icon--16");
    wrapper = shallowMount(BaseIcon, {
      propsData: {
        icon: "icon-search-24"
      }
    });
    expect(wrapper.classes()).toContain("icon--24");
  });

  it("it uses fill prop to color the element", () => {
    expect(wrapper.attributes().style).toBeFalsy();
    wrapper = shallowMount(BaseIcon, {
      propsData: {
        ...propsData,
        fill: "rebeccapurple"
      }
    });
    expect(wrapper.attributes().style).toBe("fill: rebeccapurple;");
  });
});
