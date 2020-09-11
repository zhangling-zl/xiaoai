<template>
  <div>
    <el-dialog title="提示" :visible.sync="Visible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
      Visible:{
          type:Boolean,
          default:false
      }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>