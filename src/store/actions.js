/**
 * Created by Administrator on 2017/9/27.
 */
import * as types from './mutation-types'

// 监听过渡结束
export const listenTransitionEnd = (context, {obj, callback}) => {
  if (typeof obj === 'object') {
    obj.addEventListener('webkitTransitionEnd', () => {
      callback && callback()
    })
    obj.addEventListener('transitionEnd', () => {
      callback && callback()
    })
  }
}

// 再次启动动画
export const transitionAgain = ({state, commit}, {obj}) => {
  if (state.carousel.index >= state.carousel.length) {
    commit(types.REMOVE_TRANSITION, {obj})
    commit(types.SET_TRANSLATE, {x: 0, y: 0, z: 0, obj})
    state.carousel.index = 0
  }
}

// 生成随机数
export const createID = (m, n) => { // 生成一个从 m - n 之间的随机整数
  return Math.ceil(Math.random() * (n - m) + m)
}

// 添加监听滚动事件
export const AddEventListenerFn = (context, {obj, callback}) => {
  if (typeof obj === 'object') {
    obj.addEventListener('scroll', (event) => {
      // 判断默认行为是否可以被禁用
      if (event.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!event.defaultPrevented) {
          event.preventDefault()
        }
      }
      callback && callback()
    }, false)
  }
}

// 移除监听事件
export const RemoveEventListenerFn = (context, {obj, callback}) => {
  if (typeof obj === 'object') {
    obj.removeEventListener('scroll', () => {
      callback && callback()
    })
  }
}
