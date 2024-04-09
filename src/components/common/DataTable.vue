<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="index"
          @click="navigateToUser(item.name, item.login.uuid)"
          style="cursor: pointer">
          <td v-for="column in columns" :key="column.key">
            <img
              v-if="column.key === 'picture'"
              alt="User image"
              :src="item[column.key].thumbnail" />
            <span v-else-if="typeof column.formatter === 'function'">
              {{ column.formatter(item[column.key]) }}
            </span>
            <span v-else>
              {{ item[column.key] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DataTableComponent",
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  methods: {
    navigateToUser(name, id) {
      this.$router.push(`/user/${name.first}-${name.last}/${id}`);
    },
  },
};
</script>
