<template>
  <svg class="icon" :class="`icon--${size}`" :style="styles">
    <use :href="`${iconsUrl}#${icon}`" />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";

const BaseIcon = Vue.extend({
  props: {
    icon: {
      type: String,
      default: ""
    },
    fill: {
      type: String
    }
  },
  computed: {
    size(): number {
      const num: string = this.icon.split("-").pop() || "";
      return isNaN(parseInt(num)) ? 16 : parseInt(num);
    },
    styles(): object | null {
      return this.fill ? { fill: this.fill } : null;
    },
    iconsUrl(): string {
      return process.env.VUE_APP_ICONS_URL || "";
    }
  }
});

export default BaseIcon;
</script>

<style lang="scss">
.icon {
  &--16 {
    height: 16px;
    width: 16px;
  }
  &--24 {
    height: 24px;
    width: 24px;
  }
}
</style>
