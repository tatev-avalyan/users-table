<template>
  <div>
    <div class="spinner-overlay" v-if="loading">
      <Spinner />
    </div>
    <div v-else class="user-info">
      <div class="header">
        <router-link to="/" class="back-link">
          {{ "< Back" }}
        </router-link>
      </div>
      <div v-if="selectedUser" class="user-details">
        <img :src="selectedUser.picture.large" alt="User Photo" />
        <h2>
          {{ selectedUser.name.title }} {{ selectedUser.name.first }}
          {{ selectedUser.name.last }}
        </h2>
        <p>{{ selectedUser.gender }}</p>
        <p>{{ selectedUser.dob.age }} years old</p>
        <p>
          Date of Birth:
          {{ new Date(selectedUser.dob.date).toLocaleDateString("en-US") }}
        </p>
        <p>Email: {{ selectedUser.email }}</p>
        <p>Phone: {{ selectedUser.phone }}</p>
        <p>Cell: {{ selectedUser.cell }}</p>
        <p>
          Location: {{ selectedUser.location.street.number }}
          {{ selectedUser.location.street.name }},
          {{ selectedUser.location.city }}, {{ selectedUser.location.state }},
          {{ selectedUser.location.country }}
          {{ selectedUser.location.postcode }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserDetails",
  components: { Spinner },
  computed: {
    ...mapGetters(["selectedUser"]),
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.getUser();
  },
  methods: {
    ...mapActions(["selectUser"]),
    getUser() {
      try {
        const userId = this.$route.params.id;
        this.selectUser(userId);
        this.loading = false;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>
