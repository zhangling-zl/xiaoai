<template>
  <div>
    <el-table :data="users" v-loading="!users.length">
      <el-table-column :columns='columns'></el-table-column>
    </el-table>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "AiTable",
  props: {
    users: {
      type: Array,
      required: true, //必填项
    },
    columns: {
      type: Array,
      required: true, //必填项
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(this.users);
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>