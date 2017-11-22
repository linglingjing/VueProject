import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import classify from '@/components/classify/classify'
import shopcart from '@/components/shopcart/shopcart'
import mine from '@/components/mine/mine'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {path: '/home', name: 'home', component: home},
    {path: '/classify', name: 'classify', component: classify},
    {path: '/shopcart', name: 'shopcart', component: shopcart},
    {path: '/mine', name: 'mine', component: mine}
  ]
})
