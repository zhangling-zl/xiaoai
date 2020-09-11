<template>
  <div>
    <el-card class="box-card">
      <div class="input mr10 mb20" style="width: 300px;">
        <el-input placeholder="请输入搜索内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <el-table :data="goods" stripe style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180" align="center"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180" align="center"></el-table-column>
        <el-table-column prop="mobile" label="是否付款" align="center"></el-table-column>
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
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button
                size="mini"
                type="warning"
                @click="handleDistribution(scope.$index, scope.row)"
              >
                <i class="el-icon-setting"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
//如果vuex有提交mutations,固定写法
import { createNamespacedHelpers } from "vuex";
const ordersModule = createNamespacedHelpers("orders"); //user是模块名（store/index/modules/user）
const { mapState: ordersState, mapActions: ordersActions } = ordersModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      //订单列表的请求 参数初始值
      query: "", //查询参数
      pagenum: 1, //当前页码
      pagesize: 10, //每页显示条数
      user_id: "", //用户id
      pay_status: "", //支付状态
      is_send: "", //是否发货
      order_fapiao_title: "", //个人或者公司
      order_fapiao_company: "", //公司名称
      order_fapiao_content: "", //发票内容
      consignee_addr: "", //发货地址
    };
  },
  methods: {
    //展开vuex的请求
    ...ordersActions(["getOrders"]),
  },
  mounted() {
    //订单列表（请求调用）
    this.getOrders({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
      user_id: this.user_id,
      pay_status: this.pay_status,
      is_send: this.is_send,
      order_fapiao_title: this.order_fapiao_title,
      order_fapiao_company: this.order_fapiao_company,
      order_fapiao_content: this.order_fapiao_content,
      consignee_addr: this.consignee_addr,
    });
  },
  watch: {},
  computed: {
    //展开vuex的数组（数据）
    ...ordersState(["goods,total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>