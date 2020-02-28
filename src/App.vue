<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <base-icon class="color--red" fill="seagreen" icon="icon-pencil-24" />
    <base-input v-model="form.value" id="test"></base-input>
    {{form.value}}
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
      form: {
        value: ""
      }
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
