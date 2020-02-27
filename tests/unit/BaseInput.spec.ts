import { shallowMount, Wrapper } from "@vue/test-utils";
import BaseInput from "@/elements/BaseInput.vue";

let wrapper: Wrapper<Vue>;

const propsData = {
  value: "test"
};

beforeEach(() => (wrapper = shallowMount(BaseInput, { propsData })));
afterEach(() => wrapper.destroy());

describe("<BaseInput>", () => {
  it("displays placeholder only if placeholder prop is present", () => {
    let placeholderElem = wrapper.find(".input__placeholder-label");
    expect(placeholderElem.exists()).toBeFalsy();
    wrapper = shallowMount(BaseInput, { propsData: { ...propsData, placeholder: "Scorpions - Still loving you" } });
    placeholderElem = wrapper.find(".input__placeholder-label");
    expect(placeholderElem.exists()).toBe(true);
    expect(placeholderElem.text()).toBe("Scorpions - Still loving you");
  });

  it("emits an 'input-focused' and 'input-blurred' events on input focus and blur respectively", () => {
    const inputElem = wrapper.find(".input__field");
    inputElem.trigger("focus");
    expect(wrapper.emitted("input-focused")).toBeTruthy();
    inputElem.trigger("blur");
    expect(wrapper.emitted("input-blurred")).toBeTruthy();
  });

  it("emits an 'input' event with input element value on input change", () => {
    const inputElem = wrapper.find(".input__field");
    const inputField: HTMLInputElement = wrapper.find(".input__field").element as HTMLInputElement;
    expect(inputField.value).toBe(propsData.value);

    let newValue = "Hello";
    inputField.value = newValue;
    inputElem.trigger("input");
    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([newValue]);

    newValue = "";
    inputField.value = newValue;
    inputElem.trigger("input");
    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted().input[1]).toEqual([newValue]);
  });
});
