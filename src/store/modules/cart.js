/**
 * Created by Administrator on 2017/11/9.
 */
const state = {
  added: [],
  size: null,
  color: null,
  index1: null,
  index2: null
}
const getters = {
  cartProducts: state => state.added,
  styleId: state => state.color,
  sizeId: state => state.size,
  currentIndex1: state => state.index1,
  currentIndex2: state => state.index2
}
const mutations = {
  SET_STYLE_ID (state, styleID) {
    state.color = styleID
  },
  SET_SIZE_ID (state, sizeID) {
    state.size = sizeID
  },
  SET_CURRENT_INDEX1 (state, index) {
    state.index1 = index
  },
  SET_CURRENT_INDEX2 (state, index) {
    state.index2 = index
  },
  // 加入购物车
  ADD_TO_CART (state, {objCart, buyCount}) {
    let cart = state.added
    let goods = objCart
    let record = cart.find(f => f.xdSkuId === goods.xdSkuId)
    if (!record) { // 判断是否已经添加过同一商品
      goods.buyCount = buyCount
      cart.push(goods)
    } else {
      console.log(buyCount, record.buyCount)
      record.buyCount += buyCount
    }
    state.added = cart
  }
}
const actions = {
  setStyleID ({commit}, styleID) {
    commit('SET_STYLE_ID', styleID)
  },
  setSizeID ({commit}, sizeID) {
    commit('SET_SIZE_ID', sizeID)
  },
  setCurrentIndex1 ({commit}, index) {
    commit('SET_CURRENT_INDEX1', index)
  },
  setCurrentIndex2 ({commit}, index) {
    commit('SET_CURRENT_INDEX2', index)
  },
  addToCart ({commit}, {objCart, buyCount}) {
    commit('ADD_TO_CART', {objCart, buyCount})
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
