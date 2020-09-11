<template>
  <div>
    <el-table :data="users" v-loading="!users.length">
      <template v-for="(item,index) in columns">
        <el-table-column
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :width="item.width"
          :border="item.border"
          :key="index"
        ></el-table-column>
      </template>
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