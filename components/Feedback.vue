<template>
  <v-snackbar
    top
    app
    :color="$store.state.utils.feedbackColor"
    v-model="closeFeedback"
    :timeout="$store.state.utils.feedbackTimer"
    transition="scroll-y-transition"
  >
    <v-icon small left>{{ $store.state.utils.feedbackIcon }}</v-icon>
    <span>{{ $store.state.utils.feedbackText }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn @click="closeFeedback = false" small icon v-bind="attrs">
        <v-icon x-small>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    closeFeedback: {
      get() {
        return this.$store.state.utils.feedbackShow;
      },
      set(v) {
        this.$store.commit("utils/Feedback", {
          show: false
        });
      }
    }
  }
};
</script>

<style></style>
