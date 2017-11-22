/**
 * Created by Administrator on 2017/11/16.
 */
const state = {
  isSelectGood: false,
  isSelectShop: false,
  isSelectAll: false,
  price: 0
}
const getters = {
  selectGood: state => state.isSelectGood,
  totalPrice: state => state.price
}
const mutations = {
  SET_SELECT_GOOD (state, str) {
    state.isSelectGood = str
  },
  SET_SELECT_ALL (state, str) {
    state.isSelectAll = str
  }
}
const actions = {
  setSelectGood ({commit}, str) {
    commit('SET_SELECT_GOOD', str)
  },
  setSelectAll ({commit}, str) {
    commit('SET_SELECT_ALL', str)
  },
  getPrice ({state}, {price, flag}) {
    if (flag) {
      state.price += price
      state.price.toFixed(2)
    }
    if ((flag === false) && (price > 0)) {
      state.price -= price
      state.price.toFixed(2)
    }
    console.log(state.price)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
