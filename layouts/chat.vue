<template>
  <v-app>
    <v-app-bar class="pr-md-7" elevate-on-scroll app>
      <input id="roominput" type="hidden" :value="$route.params.id" />
      <v-list-item>
        <v-list-item-avatar class="pg">
          <v-icon size="20" dark>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <span>{{ username }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" @click="showMembers = true" icon>
            <v-icon>mdi-account-group</v-icon>
          </v-btn>
        </template>
        <span class="text-caption">Room Members</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" @click="copyId" icon>
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </template>
        <span class="text-caption">Copy & Share Room ID</span>
      </v-tooltip>
      <v-btn v-if="$vuetify.breakpoint.smAndDown" @click="share" icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <v-btn @click="switchTheme" icon>
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer :disable-resize-watcher="true" v-model="drawer" app>
      <v-list nav>
        <v-list-item link>
          <v-list-item-avatar class="pg">
            <v-icon size="20" dark>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              <span>{{ username }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <Nuxt />
    </v-main>
    <Members :show="showMembers" @CloseMembers="showMembers = $event" />
    <Feedback />
    <Loader />
  </v-app>
</template>
<script>
export default {
  mounted() {
    this.username = localStorage.getItem("username");
  },
  data() {
    return {
      username: "",
      drawer: false,
      showMembers: false,
    };
  },
  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    async share() {
      let sharedata = {
        title: "Let's have a quick chat",
        text: "Click the link to join the room.",
        url: window.location.href,
      };
      try {
        await navigator.share(sharedata);
      } catch (error) {
        console.log(error);
      }
    },
    copyId() {
      let ct = document.querySelector("#roominput");
      ct.setAttribute("type", "text");
      ct.select();

      let s = document.execCommand("copy");
      this.$store.commit("utils/Feedback", {
        show: true,
        color: "primary",
        text: "Room ID Copied.",
      });
      ct.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
};
</script>
