<template>
  <div>
    <el-dialog title="提示" :visible.sync="Visible" width="30%" :before-close="handleClose">
      <!-- <span>这是一段信息</span>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="Visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AiFrom",
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
      this.$emit("update:Visible", false);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>