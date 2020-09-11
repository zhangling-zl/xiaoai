// 商品
import api from '../../http/api'
import dayjs from 'dayjs'
import { Message } from 'element-ui'
// import { Message } from 'element-ui'
import Vue from 'vue'

// import { Message } from 'element-ui'
// import { Message } from 'element-ui'
export default {
    //开启命名空间
    namespaced: true,
    //存储共享的数据
    state: {
        goodslist: [],//商品列表
        total: 0,//总条数
        categories: [],//商品参数
        categor: [],//参数列表
        totalAll: 0,//总条数分类参数
        categoriesAll: 0,//商品分类的总条数
    },
    //同步修改state的值
    mutations: {
        setgoods(state, data) {
            state.goodslist = data
        },
        setTotal(state, data) {
            state.total = data
        },
        setCategories(state, data) {
            state.categories = data
        },
        categoriesAll(state, data) {
            state.categoriesAll = data
        },
        setCategor(state, data) {
            state.categor = data
        },
        setTotalAll(state, data) {
            state.totalAll = data
        },

    },
    //异步提交mutations
    actions: {
        //商品列表
        async getGoods({ commit }, { query, pagenum, pagesize }) {
            let res = await api.getGoods({ query, pagenum, pagesize })
            if (res.meta.status === 200) {
                res.data.goods.map(item => {
                    item.add_time = dayjs(item.add_time).format('YYYY-MM-DD hh:mm:ss')
                })
                commit('setgoods', res.data.goods)
                commit('setTotal', res.data.total)
                console.log(res.data.goods);
            }
        },
        //删除商品
        async deleteGoods({ dispatch }, { query, pagenum, pagesize, id }) {
            let res = await api.deleteGoods({ query, pagenum, pagesize, id })
            if (res.meta.status === 200) {
                dispatch('getGoods', { query, pagenum, pagesize })
                // Message.success('删除成功')
            }
        },

        //商品分类数据列表
        async getCategories({ commit }, { type, pagenum, pagesize }) {
            let res = await api.getCategories({ type, pagenum, pagesize })
            if (res.meta.status === 200) {
                res.data.map(item => {
                    item.label = item.cat_name
                    item.value = item.cat_id
                    if (item.children) {
                        item.children.map(item1 => {
                            item1.label = item1.cat_name
                            item1.value = item1.cat_id
                            if (item1.children) {
                                item1.children.map(item2 => {
                                    item2.label = item2.cat_name
                                    item2.value = item2.cat_id
                                })
                            }
                        })
                    }
                })
                commit('setCategories', res.data)
                // console.log(res.data, '分类参数');
                commit('categoriesAll', res.data.length)
            }
        },
        // 参数列表
        async Categories({ commit }, { id, sel }) {
            let res = await api.Categories({ id, sel })
            if (res.meta.status === 200) {
                res.data.map(item => {
                    item.attr_vals = item.attr_vals.split(',')
                    if (item.attr_vals[0] === '') {
                        item.attr_vals = []
                    }
                    Vue.set(item, 'inputVisible', false)
                })
                console.log(res.data, '小标签');
                commit('setCategor', res.data)
                commit('setTotalAll', res.data.length)
            }
        },
        //添加动态属性
        async addCategories({ dispatch }, { id, attr_name, attr_sel, attr_vals, sel }) {
            let res = await api.addCategories({ id, attr_name, attr_sel, attr_vals, sel })
            if (res.meta.status === 201) {
                dispatch('Categories', { id, sel })
                // Message.success('添加成功')
            }
        },

        //编辑提交参数
        async putCategories({ dispatch }, { id, sel, attrId, attr_name, attr_sel, attr_vals }) {
            let res = await api.putCategories({ id, sel, attrId, attr_name, attr_sel, attr_vals })
            if (res.meta.status === 200) {
                dispatch('Categories', { id, sel })
            }
        },
        //删除分类参数
        async deleteCategories({ dispatch }, { id, attrId, sel }) {
            let res = await api.deleteCategories({ id, attrId, sel })
            if (res.meta.status === 200) {
                dispatch('Categories', { id, attrId, sel })
            }
        },
        //删除分类
        async delete({ dispatch }, { id, type, pagenum, pagesize }) {
            let res = await api.delete({ id, type, pagenum, pagesize })
            if (res.meta.status === 200) {
                dispatch('getCategories', { id, type, pagenum, pagesize })
                console.log(res.data, '删除');
            }
        },
        //编辑分类提交
        async putCategoriesId({ dispatch }, { id, cat_name, type, pagenum, pagesize }) {
            let res = await api.putCategoriesId({ id, cat_name, type, pagenum, pagesize })
            if (res.meta.status === 200) {
                dispatch('getCategories', { id, cat_name, type, pagenum, pagesize })
                console.log(res.data, '编辑');
            }
        },
        //添加
        async putGories({ dispatch }, { cat_pid, cat_name, cat_level, type, pagenum, pagesize }) {
            let res = await api.putGories({ cat_pid, cat_name, cat_level, type, pagenum, pagesize })
            if (res.meta.status === 201) {
                dispatch('getCategories', { type, pagenum, pagesize })
                // console.log(res.data, '添加');
                Message.success('添加成功')
            }
        },

        //商品--添加商品
        async goods({ dispatch }, { goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }) {
            let res = await api.goods({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs })
            // console.log(res)
            if (res.meta.status === 200) {
                // console.log(res.data);
                // console.log(dispatch);
            }
        },

    }
}