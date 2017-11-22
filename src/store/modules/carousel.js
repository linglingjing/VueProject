/**
 * Created by Administrator on 2017/9/27.
 */
import * as types from '../mutation-types'
const state = {
  index: 0,
  timer: 1,
  length: 0
}
const getters = {
  imgIndex: state => {
    return state.index
  }
}
const mutations = {
  // 接受轮播的长度
  [types.RECEIVE_LENGTH] (state, length) {
    state.length = length
  }
}
const actions = {
  // 设置计时器，开始轮播
  startCarousel ({commit, state}, {obj, width}) {
    clearInterval(state.timer)
    obj.style.width = state.length * 150 + '%'
    state.timer = setInterval(() => {
      state.index++
      commit(types.ADD_TRANSITION, {obj})
      let offset = -state.index * width + 'px'
      commit(types.SET_TRANSLATE, {x: offset, y: 0, z: 0, obj})
    }, 5000)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
