<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <base-icon class="color--red" fill="seagreen" icon="icon-pencil-24" />
    <base-input
      v-model="value"
      id="test"
      :type-icon="{ icon: 'icon-search-16' }"
      :action-icon="{ icon: 'icon-pencil-16' }"
      placeholder="placehorlder text"
    ></base-input>
    {{ value }}
    <base-input
      v-model="value2"
      id="test"
      disabled="disabled"
      :type-icon="{ icon: 'icon-search-16' }"
      :action-icon="{ icon: 'icon-pencil-16' }"
      placeholder="placehorlder text"
    ></base-input>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseIcon from "@/elements/BaseIcon.vue";
import BaseInput from "@/elements/BaseInput.vue";

export default Vue.extend({
  name: "App",
  components: {
    BaseIcon,
    BaseInput
  },
  data() {
    return {
      value: "",
      value2: ""
    };
  }
});
</script>

<style lang="scss">
@import "@/assets/styles/_base_theme.scss";
</style>
