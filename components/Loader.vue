<template>
  <div>
    <v-overlay
      z-index="99999"
      color="white"
      class="d-flex justify-center align-center"
      opacity="0.9"
      light
      v-model="loading"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="150"
      ></v-progress-circular>
      <h3 class="mt-15 text-center black--text">Loading</h3>
    </v-overlay>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.utils.showOverlay;
    }
  }
};
</script>
