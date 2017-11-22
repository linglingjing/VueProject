/**
 * Created by Administrator on 2017/9/27.
 */
import * as types from './mutation-types'

export default {
  // 定义添加过渡效果
  [types.ADD_TRANSITION] (state, {obj}) {
    obj.style.transition = 'all .5s'
    obj.style.webkitTransition = 'all .5s'
  },
  // 移除孤过渡效果
  [types.REMOVE_TRANSITION] (state, {obj}) {
    obj.style.transition = 'none'
    obj.style.webkitTransition = 'none'
  },
  // 设置移动
  [types.SET_TRANSLATE] (state, {x, y, z, obj}) {
    obj.style.transform = `translate3D(${x}, ${y}, ${z})`
    obj.style.webkitTransform = `translate3D(${x}, ${y}, ${z})`
  }
}
