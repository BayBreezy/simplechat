export default {
  /**
   * Mutation used to update feedback to user
   */
  Feedback(state, data) {
    state.feedbackText = data.text || "";
    state.feedbackIcon = data.icon;
    state.feedbackColor = data.color;
    state.feedbackTimer = data.time || 7000;
    state.feedbackShow = data.show;
  },
  /**
   * Mutation used to set the overlay
   */
  Set_Overlay(state, data) {
    state.showOverlay = data;
  }
};
