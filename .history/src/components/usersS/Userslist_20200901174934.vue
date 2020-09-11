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
      <el-table :data="users" stripe style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180" align="center"></el-table-column>
        <el-table-column prop="create_time" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#eee"
              @change="change(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑角色" placement="top">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button size="mini" type="warning">
                <i class="el-icon-setting"></i>
              </el-button>
            </el-tooltip>
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

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="40%" :show-close="false">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
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
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleAll" width="40%" :show-close="false">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
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
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { Message } from "element-ui";
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user"); //user是模块名（store/index/modules/user）
const { mapState: mapState, mapActions: mapActions } = userModule;

const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("电话不能为空"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      pagenum: 1, //当前页数
      pagesize: 5, //每页条数
      num: false, //控制input框边框颜色的变化
      input3: "", //输入框绑定的值
      dialogFormVisible: false, //控制添加弹框的显示与隐藏
      dialogFormVisibleAll: false, //控制编辑弹框的显示与隐藏
      form: {
        username: "", //用户名
        password: "", //密码
        email: "", //邮箱
        mobile: "", //手机号
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { required: true, validator: validPhone, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //展开vuex的请求
    ...mapActions(["getUsers", "postAddusers", "putState", "deleteUsers"]),
    //点击编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisibleAll = true
    },
    //删除
    handleDelete(index, row) {
      // console.log(index, row.id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteUsers({
            id: row.id,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分页 （每页多少条）
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      //点击每一页之后再发一次请求
      this.getUsers({ pagenum: this.pagenum, pagesize: this.pagesize });
    },
    //分页 （当前页）
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUsers({ pagenum: this.pagenum, pagesize: this.pagesize });
    },
    //点击添加用户 显示弹框
    addList() {
      //默认弹框是不显示的，点击编辑按钮的时候，显示编辑弹框
      this.dialogFormVisible = true;
    },
    //点击添加弹框的确定
    determine() {
      this.dialogFormVisible = false;
      this.postAddusers({
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        mobile: this.form.mobile,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    //点击状态
    change(row) {
      this.putState({
        uId: row.id,
        type: row.mg_state,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
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