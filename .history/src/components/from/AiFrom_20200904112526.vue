<template>
  <div>
    <el-dialog title="提示" :visible.sync="Visible" width="30%" >
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
   
    //点击弹框取消
    cancel(){
         this.$emit("cancel");
    //  this.$emit('update:visible',false)
    //把事件传给父组件
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>