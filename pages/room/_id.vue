<template>
  <v-container id="cont">
    <div v-for="(m, i) in messages" :key="`message-${i}`">
      <div class="d-flex">
        <v-avatar tile class="pg mr-3 rounded-lg mt-2">
          <v-icon small dark>mdi-account</v-icon>
        </v-avatar>
        <div>
          <span
            :class="{ 'primary--text': m.from === username }"
            class="text-caption font-weight-bold"
            >{{ m.from }}</span
          >
          <span style="font-size: 9px">{{
            $dayjs(m.time).format("MMM D, YYYY h:ma")
          }}</span>
          <p
            class="
              pa-2
              primary
              lighten-5
              mb-3
              rounded-lg
              text-body-2
              black--text
            "
          >
            {{ m.msg }}
          </p>
        </div>
      </div>
    </div>
    <v-btn
      @click="scrollBot()"
      fab
      small
      depressed
      fixed
      style="bottom: 80px"
      right
    >
      <v-icon color="primary">mdi-chevron-down</v-icon>
    </v-btn>

    <v-footer app>
      <v-text-field
        hide-details="auto"
        @keypress.enter="sendMessage"
        outlined
        v-model.trim="newMessage"
        placeholder="type something..."
      ></v-text-field>
      <v-btn @click="sendMessage" fab class="pg ml-3" dark depressed>
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  layout: "chat",
  mounted() {
    /**
     * Instantiate WS connection with nuxt-socket-io
     */
    this.socket = this.$nuxtSocket({ name: "home" });

    /**
     * Get user credential from localstorage
     */
    const username = localStorage.getItem("username");
    const roomId = localStorage.getItem("roomId");

    if (!username || !roomId) {
      this.$errorText({ message: "Join or create a room." });
      return this.$router.push("/");
    }
    this.username = username;

    // Socket events that we want to listent o on this page
    this.socket.emit("join", { username, roomId });
    this.socket.on("init-messages", (msgs) => {
      this.messages = msgs;
    });
    this.socket.on("new-msg", (msg) => {
      this.messages.push(msg);
      this.scrollBot();
    });
    this.socket.on("new-user-joined", (name) => {
      this.$store.commit("utils/Feedback", {
        show: true,
        color: "primary",
        text: `${name} joined the room`,
        icon: "mdi-account",
      });
    });
    this.scrollBot();
  },
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: "",
      username: "",
    };
  },
  methods: {
    /**
     * Method used to scroll to end of page/messages
     */
    scrollBot() {
      setTimeout(() => {
        let c = document.getElementById("cont");
        this.$vuetify.goTo(c.scrollHeight, { duration: 500 });
      }, 250);
    },
    /**
     * Method used to send messages
     */
    sendMessage() {
      if (!this.newMessage.trim()) return;

      // create obj to send ot server
      let nm = {
        msg: this.newMessage,
        roomId: this.$route.params.id,
        from: localStorage.getItem("username"),
        time: Date.now(),
      };

      this.socket.emit("new-msg", nm);
      this.messages.push(nm);
      this.newMessage = "";
      this.scrollBot();
    },
  },
};
</script>

<style></style>
