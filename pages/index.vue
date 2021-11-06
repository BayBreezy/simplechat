<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card color="rgba(255,255,255,0.3)" class="el pa-5">
          <v-avatar size="80" class="mx-auto d-block my-10 pg">
            <v-icon size="30" dark>mdi-account</v-icon>
          </v-avatar>
          <v-form lazy-validation>
            <v-row justify="center">
              <v-col cols="11">
                <label class="text-md-body-2 font-weight-bold" for="username"
                  >Username</label
                >
                <v-text-field
                  solo
                  v-model.trim="username"
                  id="username"
                  rounded
                  class="mt-2"
                ></v-text-field>
              </v-col>
              <v-col cols="11">
                <v-btn
                  @click="CreateRoom"
                  block
                  depressed
                  rounded
                  min-height="45"
                  class="pg text-capitalize text-md-subtitle-1"
                  dark
                  >Create Room</v-btn
                >
              </v-col>
              <v-col class="d-flex align-center" cols="11">
                <v-divider /> <span class="mx-3">OR</span> <v-divider />
              </v-col>
              <v-col cols="11">
                <label class="text-md-body-2 font-weight-bold" for="roomid"
                  >Room ID</label
                >
                <v-text-field
                  solo
                  id="roomid"
                  v-model.trim="roomId"
                  rounded
                  class="mt-2"
                ></v-text-field>
              </v-col>
              <v-col cols="11">
                <v-btn
                  block
                  @click="JoinRoom"
                  rounded
                  depressed
                  min-height="45"
                  class="text-capitalize text-md-subtitle-1"
                  >Join Room</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  mounted() {
    // check if user already has roomid and username
    const username = localStorage.getItem("username");
    const roomId = localStorage.getItem("roomId");

    if (!!username && !!roomId) {
      this.$router.push("/room/" + roomId);
    }
    this.$nuxtSocket({});
  },
  data() {
    return {
      username: null,
      roomId: null,
    };
  },
  methods: {
    async CreateRoom() {
      if (!this.username)
        return this.$errorText({ message: "Username Required." });

      const roomId = uuidv4();
      localStorage.setItem("roomId", roomId);
      localStorage.setItem("username", this.username);

      // redirect to room
      this.$router.push("/room/" + roomId);
    },
    async JoinRoom() {
      if (!this.username || !this.roomId)
        return this.$errorText({ message: "Username & Room ID Required." });

      localStorage.setItem("roomId", this.roomId);
      localStorage.setItem("username", this.username);

      // redirect to room
      this.$router.push("/room/" + this.roomId);
    },
  },
};
</script>

<style></style>
