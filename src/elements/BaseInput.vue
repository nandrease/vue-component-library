<template>
  <div
    class="input input--rounded"
    :class="[
      status ? `input--${status.toLowerCase()}` : '',
      { 'input--disabled': isDisabled },
      { 'input--active': value },
      { 'input--type-icon': typeIcon },
      { 'input--action-icon': actionIcon || isLoading }
    ]"
  >
    <base-icon v-if="typeIcon" class="input__type-icon" v-bind="{ ...typeIcon }"></base-icon>
    <label v-if="placeholder" class="input__placeholder-label">{{ placeholder }}</label>
    <input
      class="input__field"
      :value="value"
      :id="id"
      :type="type"
      autocomplete="off"
      spellcheck="false"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        input: $event => $emit('input', $event.target.value)
      }"
      @focus.prevent="() => $emit('input-focused')"
      @blur.prevent="() => $emit('input-blurred')"
    />
    <template v-if="!isDisabled">
      <span v-if="isLoading" class="input__loading-circle"></span>
      <base-icon
        v-else-if="actionIcon"
        class="input__action-icon"
        v-bind="{ ...actionIcon }"
        @click.native="() => $emit('action-icon-click')"
      ></base-icon>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { STATUS_LOADING } from "@/constants";
import BaseIcon from "@/elements/BaseIcon.vue";

const BaseInput = Vue.extend({
  components: { BaseIcon },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String
    },
    value: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    status: {
      type: String,
      default: ""
    },
    disabled: {
      type: String
    },
    typeIcon: {
      type: Object,
      default: null
    },
    actionIcon: {
      type: Object,
      default: null
    }
  },
  computed: {
    isDisabled(): boolean {
      return this.disabled !== null && typeof this.disabled !== "undefined";
    },
    isLoading(): boolean {
      return this.status === STATUS_LOADING;
    }
  }
});
export default BaseInput;
</script>

<style lang="scss">
@import "@/assets/styles/_color_variables.scss";
.input {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: $neutral-00;
  border: 1px solid $neutral-40;
  box-sizing: border-box;
  color: $neutral-70;
  max-width: 100%;

  /* modifiers start */
  &--rounded {
    border-radius: 4px;
  }
  &--error {
    border-color: $red-50;
  }
  &--active {
    .input__placeholder-label {
      font-size: 10px;
      top: -8px;
      background: $neutral-00;
      border-color: $neutral-00;
      border-width: 4px;
      left: 4px; //reduce it by same amount as border width
      padding-left: 0;
      color: $neutral-60;
      line-height: 1em;
      z-index: 10;
    }
  }

  &--disabled {
    background: $neutral-20;
    color: $neutral-80;
    border-color: transparent;

    .input__placeholder-label {
      background-color: transparent;
      border-color: transparent;
    }
  }

  &.input--action-icon {
    .input__field,
    .input__placeholder-label {
      padding-right: 0;
    }
  }

  &.input--type-icon {
    .input__field,
    .input__placeholder-label {
      padding-left: 4rem;
    }
  }
  &.input--type-icon.input--active {
    .input__placeholder-label {
      padding-left: 0;
    }
  }
  /* modifiers end */

  /* elements start */
  &__type-icon {
    left: 8px;
    position: absolute;
  }
  &__action-icon {
    padding: 8px;
  }

  &__placeholder-label {
    position: absolute;
    padding-left: 1rem;
    font-size: 14px;
    letter-spacing: normal;
    border: solid 0 transparent;
    border-radius: 4px;
    transition: font-size 0.2s, border-bottom-width 0.2s;
  }

  .input__field {
    background: transparent;
    outline: none;
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 1;

    &,
    &:focus {
      border: none;
    }
  }
  /* elements end */
}
</style>
