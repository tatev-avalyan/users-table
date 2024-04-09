<template>
  <div class="pagination">
    <button
      @click="changePage('prev')"
      :disabled="initialPagination.page === 1"
      class="pagination-button">
      <span>{{ "<" }}</span>
    </button>
    <span class="pagination-info"
      >{{ initialPagination.page }} / {{ totalPages }}</span
    >
    <button
      @click="changePage('next')"
      :disabled="initialPagination.page === totalPages"
      class="pagination-button">
      <span>{{ ">" }}</span>
    </button>

    <select
      v-model="selectedResults"
      @change="getData"
      class="pagination-select">
      <option v-for="limit in limits" :key="limit" :value="limit">
        {{ limit }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    initialPagination: {
      type: Object,
      required: true,
    },
    limits: {
      type: Array,
      default: () => [10, 20, 30],
    },
    totalResults: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedResults: this.initialPagination.results,
    };
  },
  computed: {
    currentPage() {
      return this.initialPagination.page;
    },
    results() {
      return this.selectedResults;
    },
    totalPages() {
      const { results } = this.initialPagination;
      return results > 0 ? Math.ceil(this.totalResults / results) : 0;
    },
  },
  methods: {
    changePage(action) {
      if (action === "prev" && this.currentPage > 1) {
        this.$emit("change", {
          ...this.initialPagination,
          page: this.initialPagination.page - 1,
        });
      } else if (action === "next" && this.currentPage < this.totalPages) {
        this.$emit("change", {
          ...this.initialPagination,
          page: this.initialPagination.page + 1,
        });
      }
    },
    getData() {
      this.$emit("change", {
        ...this.initialPagination,
        results: this.selectedResults,
      });
    },
  },
};
</script>
