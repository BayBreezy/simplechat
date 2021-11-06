<template>
  <div>
    <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown"
      transition="slide-y-transition"
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-btn
          @click="dialog = false"
          small
          icon
          absolute
          style="top: 10px"
          right
        >
          <v-icon small color="red">mdi-close</v-icon>
        </v-btn>
        <v-card-title class="text-body-1 font-weight-bold">
          Members
        </v-card-title>
        <v-divider />
        <v-list>
          <v-list-item
            v-for="(m, i) in $store.state.user.userList"
            :key="`user-${i}-${m.id}`"
          >
            <v-list-item-content>
              <v-list-item-title class="text-body-2">
                {{ m.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  computed: {
    dialog: {
      get() {
        return this.show;
      },
      set(v) {
        this.$emit("CloseMembers", v);
      },
    },
  },
};
</script>

<style></style>
