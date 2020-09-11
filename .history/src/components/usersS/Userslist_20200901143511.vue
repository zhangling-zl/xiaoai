<template>
  <div>
    <el-card class="box-card">
      <div class="flex a-c mb20">
        <div class="input mr10">
          <el-input placeholder="请输入搜索内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-button type="primary" size="medium" @click="addList">添加用户</el-button>
      </div>
      <el-table
        :data="users.slice((pagenum-1)*pagesize,pagenum*pagesize)"
        stripe
        style="width: 100%"
        border
      >
        <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180" align="center"></el-table-column>
        <el-table-column prop="create_time" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#eee"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button size="mini" type="warning">
              <i class="el-icon-setting"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt15">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userstotal"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user"); //user是模块名（store/index/modules/user）
const { mapState: mapState, mapActions: mapActions } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      pagenum: 1, //当前页数
      pagesize: 5, //每页条数
      num: false, //控制input框边框颜色的变化
      input3:'',//输入框绑定的值
      dialogFormVisible: false, //控制弹框的显示与隐藏
      form: {
        username: "", //用户名
        password: "", //密码
        email: "", //邮箱
        mobile: "", //手机号
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
         email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //展开vuex的请求
    ...mapActions(["getUsers"]),
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    //分页 （每页多少条）
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    //分页 （当前页）
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
    },
    //获取焦点事件
    focus() {
      this.num = true;
    },
    //失去焦点事件
    blur() {
      this.num = false;
    },
    //点击添加用户
    addList() {
      //默认弹框是不显示的，点击编辑按钮的时候，显示编辑弹框
      this.dialogFormVisible = true;
    },
  },
  mounted() {
    //调用请求 里面传参
    this.getUsers({ pagenum: this.pagenum, pagesize: this.pagesize });
  },
  watch: {},
  computed: {
    //展开vuex的数组（数据）
    ...mapState(["users"]),
    ...mapState(["userstotal"]),
  },
};
</script>

<style scoped lang='scss'>
.input {
  width: 300px;
}
</style>