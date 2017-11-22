/**
 * Created by Administrator on 2017/10/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import carousel from './modules/carousel'
import cart from './modules/cart'
import shopcart from './modules/shopcart'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)
const state = {
  isShowDatail: false, // 是否展示单品详细信息
  isShowCompensate: false, // 是否展示超时赔付的全部信息
  isShowCart: false,
  isAddToCart: false, // 是否展示加入购物车的单品信息
  detail: {}, // 商品详情页面数据,
  cartfirstImage: '',
  shopID: ''
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    carousel,
    cart,
    shopcart
  }
})

export default store
