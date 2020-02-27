<template>
  <div class="input input--rounded" :class="[`input--${status.toLowerCase()}`, { 'input--disabled': isDisabled }]">
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const BaseInput = Vue.extend({
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
      type: String
    },
    disabled: {
      type: String
    }
  },
  computed: {
    isDisabled(): boolean {
      return typeof this.disabled !== "undefined";
    }
  }
});
export default BaseInput;
</script>

<style lang="scss"></style>
