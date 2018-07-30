import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Order from '@/pages/Order'
import Detail from '@/pages/Order/orderDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/order',
      name: '预订',
      component: Order
    },
    {
      path: '/detail',
      name: '预订详情',
      component: Detail
    }
  ]
})
