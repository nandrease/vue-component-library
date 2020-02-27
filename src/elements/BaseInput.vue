<template>
  <div class="input">
    <label v-if="placeholder" class="input__placeholder-label">{{ placeholder }}</label>
    <input
      class="input__field"
      :value="value"
      @focus.prevent="() => $emit('input-focused')"
      @blur.prevent="() => $emit('input-blurred')"
      @input.prevent="() => $emit('input', $event.target.value)"
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
    }
  }
});
export default BaseInput;
</script>

<style lang="scss"></style>
