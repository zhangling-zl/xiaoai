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
        <el-table-column prop="order_number" label="订单编号" width="250" align="center"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180" align="center"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type">{{scope.row.text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" align="center"></el-table-column>
        <el-table-column prop="update_time" label="下单时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑地址" placement="top">
              <el-button size="mini" type="primary" @click="Editaddress">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="物流信息" placement="top">
              <el-button
                size="mini"
                type="success"
                @click="handleDistribution(scope.$index, scope.row)"
              >
                <i class="el-icon-location"></i>
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
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog title="编辑地址" :visible.sync="dialogFormVisibleSLl" width="40%" :show-close="true">
      <el-cascader :options="citydata" clearable class="w100%"></el-cascader>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSLl = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleSLl = false">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import areaList from "../../../area";
import citydata from "../../../citydata";
import groupBy from "lodash/groupBy";
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
      //
      dialogFormVisibleSLl: false, //控制编辑地址弹框的显示与隐藏
      citydata: [], //城市选择
      //
      list: [],
      list1: [],
      list2: [],
      arr: [],
    };
  },
  methods: {
    //展开vuex的请求
    ...ordersActions(["getOrders","getKuaidi"]),
    //点击搜索
    search() {
      console.log(this.query);
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
    //分页 （每页多少条）
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      //点击每一页之后再发一次请求
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
    //分页 （当前页）
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
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
    //点击显示编辑地址弹框
    Editaddress() {
      this.dialogFormVisibleSLl = true;
    },
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
    //城市选择赋值
    this.citydata = citydata;
    // console.log(this.citydata,'城市');


    for (let i in areaList.province_list) {
      this.list.push({
        province: areaList.province_list[i],
        id: i,
      });
    }
    for (let i in areaList.city_list) {
      this.list1.push({
        province: areaList.city_list[i],
        id: i,
      });
    }
    for (let i in areaList.county_list) {
      this.list2.push({
        province: areaList.county_list[i],
        id: i,
      });
    }
    this.list.map((item) => {
      item.id = item.id.slice(0, 2);
    });
    this.list1.map((item) => {
      item.id = item.id.slice(0, 2);
    });
    let a = groupBy(this.list1, "id");
    for (let i in a) {
      this.arr.push({
        text: a[i],
        id: i,
      });
    }
    // // children
    console.log(this.arr, "arr");
    this.list.map((item) => {
      this.arr.map((item1) => {
        if (item.id === item1.id) {
            item.children = this.arr.filter((item3) => {
              return item.id === item3.id;
            });
        }
      });
    });
    console.log(this.list, "省");
    // console.log(this.list1, "市");
    // console.log(this.list2, "区");
  },
  watch: {},
  computed: {
    //展开vuex的数组（数据）
    ...ordersState(["goods", "total","kuaidi"]),
  },
};
</script>

<style scoped lang='scss'>
.el-cascader {
  padding-left: 0;
  padding-right: 0;
  padding-top: 15px;
  padding-bottom: 30px;
}
.el-cascader {
  width: 100%;
}
</style>