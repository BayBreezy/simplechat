export default (ctx, inject) => {
  /**
   * Function used to filter error text
   *
   * @param {*} error Object
   * @returns String
   */
  function getTxt(error) {
    return error.message
      ? error.message
      : error.response
      ? error.response
      : error;
  }

  /**
   * Inject the errorText function into the nuxt app
   */
  inject("errorText", (error) => {
    ctx.store.commit("utils/Feedback", {
      show: true,
      icon: "mdi-alert-circle",
      text: getTxt(error),
      color: "red",
    });
  });
};
