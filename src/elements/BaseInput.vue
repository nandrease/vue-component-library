<template>
  <div class="input input--rounded" :class="[`input--${status.toLowerCase()}`, { 'input--disabled': isDisabled }]">
    <base-icon v-if="typeIcon" class="input__type-icon" v-bind="{ ...typeIcon }"></base-icon>
    <label v-if="placeholder" class="input__placeholder-label">{{ placeholder }}</label>
    <input
      class="input__field"
      :value="value"
      :id="id"
      :type="type"
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

<style lang="scss"></style>
