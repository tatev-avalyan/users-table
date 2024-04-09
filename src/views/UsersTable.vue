<template>
  <div>
    <div class="spinner-overlay" v-if="loading">
      <spinner />
    </div>
    <div v-else class="container">
      <DataTable :data="data.results" :columns="columns" />
      <Pagination
        :initialPagination="initialPagination"
        :limits="limits"
        :totalResults="50"
        @change="handlePaginationChange" />
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/common/DataTable.vue";
import Pagination from "@/components/common/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import Spinner from "@/components/common/Spinner.vue";

export default {
  name: "UsersTable",
  components: { DataTable, Pagination, Spinner },
  data() {
    return {
      columns: [
        {
          key: "id",
          label: "ID",
          formatter: (value) => value.name,
        },
        {
          key: "picture",
          label: "Picture",
        },
        {
          key: "name",
          label: "Name",
          formatter: (value) =>
            value.title + " " + value.first + " " + value.last,
        },

        { key: "gender", label: "Gender" },
        {
          key: "dob",
          label: "Date of Birth",
          formatter: (value) =>
            new Date(value.date).toLocaleDateString("en-US"),
        },
        {
          key: "login",
          label: "Username",
          formatter: (value) => value.username,
        },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "cell", label: "Cell Number" },
        {
          key: "location",
          label: "Location",
          formatter: (value) =>
            value.street.number +
            " " +
            value.street.name +
            ", " +
            value.city +
            ", " +
            value.country,
        },
      ],
      loading: true,
      limits: [10, 25, 50],
      initialPagination: {
        page: 1,
        results: 10,
        seed: "abc",
      },
    };
  },

  async created() {
    this.loading = true;
    this.getUsersData();
  },
  computed: {
    ...mapGetters(["data", "totalCount"]),
  },
  methods: {
    ...mapActions(["getData"]),
    async handlePaginationChange(initialPagination) {
      this.initialPagination = initialPagination;
      this.loading = true;
      await this.getUsersData();
    },
    async getUsersData() {
      try {
        await this.getData(this.initialPagination);
        this.loading = false;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>
