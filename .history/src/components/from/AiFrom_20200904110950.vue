<template>
  <div>
    <el-dialog title="提示" :visible.sync="Visible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="Visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    Visible: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    //控制右上方的小按钮X
    handleClose() {
    // //   console.log(111); $parent控制（改变）父组件的某个元素属性
    //   this.$parent.Visible = false;
    this.$emit('update:visible',false)
    },
    //点击弹框取消
    cancel(){
     this.$emit('update:visible',false)
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>