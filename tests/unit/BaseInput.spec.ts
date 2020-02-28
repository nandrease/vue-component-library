import { shallowMount, Wrapper } from "@vue/test-utils";
import { STATUS_LOADING, STATUS_ADD, STATUS_ERROR, STATUS_WARNING, STATUS_INFO } from "@/constants";
import BaseInput from "@/elements/BaseInput.vue";

describe("<BaseInput>", () => {
  let wrapper: Wrapper<Vue>;

  const propsData = {
    value: "test",
    id: "id123",
    type: "text",
    status: "",
    disabled: null
  };

  const attrs = {
    name: "",
    autocomplete: "off",
    spellcheck: "false",
    tabindex: "0"
  };

  const onClick = jest.fn();
  const onInput = jest.fn();
  const listeners = {
    click: onClick,
    input: onInput
  };

  beforeEach(() => (wrapper = shallowMount(BaseInput, { propsData, attrs, listeners })));
  afterEach(() => wrapper.destroy());

  describe("Attributes", () => {
    it("displays placeholder only if placeholder prop is present", () => {
      let placeholderElem = wrapper.find(".input__placeholder-label");
      expect(placeholderElem.exists()).toBeFalsy();
      wrapper = shallowMount(BaseInput, {
        propsData: { ...propsData, placeholder: "Scorpions - Still loving you" }
      });
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

    it("passes component attributes to input element", () => {
      const inputElem = wrapper.find(".input__field");

      expect(inputElem.attributes().name).toBe(attrs.name);
      expect(inputElem.attributes().autocomplete).toBe(attrs.autocomplete);
      expect(inputElem.attributes().spellcheck).toBe(attrs.spellcheck);
      expect(inputElem.attributes().tabindex).toBe(attrs.tabindex);
    });

    it("passes component listeners to input element", () => {
      const inputElem = wrapper.find(".input__field");
      inputElem.trigger("click");
      inputElem.trigger("input");

      expect(onClick).toHaveBeenCalled();
      expect(onInput).toHaveBeenCalled();
    });

    it("sets input--'status' class to input wrapper from status prop", () => {
      expect(wrapper.classes()).toContain("input");

      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, status: STATUS_ERROR } });
      expect(wrapper.classes()).toContain("input--" + STATUS_ERROR.toLowerCase());

      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, status: STATUS_LOADING } });
      expect(wrapper.classes()).toContain("input--" + STATUS_LOADING.toLowerCase());

      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, status: STATUS_WARNING } });
      expect(wrapper.classes()).toContain("input--" + STATUS_WARNING.toLowerCase());

      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, status: STATUS_INFO } });
      expect(wrapper.classes()).toContain("input--" + STATUS_INFO.toLowerCase());

      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, status: STATUS_ADD } });
      expect(wrapper.classes()).toContain("input--" + STATUS_ADD.toLowerCase());
    });

    it("disabled attribute works on input and sets the 'input--disabled' class", () => {
      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, disabled: "disabled" } });

      expect(wrapper.classes()).toContain("input--disabled");
      const inputElem = wrapper.find(".input__field");
      expect(inputElem.attributes().disabled).toBeTruthy;
    });
  });

  describe("ActionIcons", () => {
    const typeIcon = {
      icon: "icon-search-16",
      fill: "#35495E"
    };
    const actionIcon = {
      icon: "icon-person-16",
      fill: "hsl(0, 0%, 100%)"
    };

    it("displays type icon when 'type-icon' prop is present", () => {
      let typeElem = wrapper.find(".input__type-icon");
      expect(typeElem.exists()).toBe(false);

      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, typeIcon }, attrs, listeners });
      typeElem = wrapper.find(".input__type-icon");
      expect(typeElem.exists()).toBe(true);
    });

    it("displays action icon when 'action-icon' prop is present", () => {
      let actionElem = wrapper.find(".input__action-icon");
      expect(actionElem.exists()).toBe(false);

      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, actionIcon }, attrs, listeners });
      actionElem = wrapper.find(".input__action-icon");
      expect(actionElem.exists()).toBe(true);
    });

    it("emits an 'action-icon-click' event on action icon click", () => {
      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, actionIcon } });
      const actionElem = wrapper.find(".input__action-icon");
      expect(actionElem.exists()).toBe(true);
      actionElem.trigger("click");
      expect(wrapper.emitted("action-icon-click")).toBeTruthy();
    });

    it("shows loading icon if status is LOADING", () => {
      let loadingElem = wrapper.find(".input__loading-circle");
      expect(loadingElem.exists()).toBe(false);

      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, status: STATUS_LOADING } });
      loadingElem = wrapper.find(".input__loading-circle");
      expect(loadingElem.exists()).toBe(true);
    });

    it("hides action icon when loading is present", () => {
      wrapper = shallowMount(BaseInput, { propsData: { ...propsData, status: STATUS_LOADING, actionIcon } });
      const loadingElem = wrapper.find(".input__loading-circle");
      expect(loadingElem.exists()).toBe(true);

      const actionElem = wrapper.find(".input__action-icon");
      expect(actionElem.exists()).toBe(false);
    });

    it("hides the loading and action-icon when field is disabled", () => {
      wrapper = shallowMount(BaseInput, {
        propsData: { ...propsData, disabled: "disabled", status: STATUS_LOADING, actionIcon, typeIcon }
      });

      expect(wrapper.classes()).toContain("input--disabled");

      const typeElem = wrapper.find(".input__type-icon");
      expect(typeElem.exists()).toBe(true);

      const actionElem = wrapper.find(".input__action-icon");
      expect(actionElem.exists()).toBe(false);

      const loadingElem = wrapper.find(".input__loading-circle");
      expect(loadingElem.exists()).toBe(false);
    });
  });
});
