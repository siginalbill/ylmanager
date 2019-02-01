import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import Admin from '@/components/Admin'
import Doctor from '@/components/Doctor'
import Service from '@/components/Service'

// 管理员组件
import ServiceList from '@/components/admin/ServiceList'
import Addaccount from '@/components/admin/Addaccount'

Vue.use(Router)

export default new Router({
  // 去除'/#'路径
  mode: 'history',
  routes: [
    // 其他
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      meta:{
        isLogin:false
      }
    },
    // 登录页面
    {
      path: '/login',
      component: Login,
      name: '请登录',
      meta:{
        isLogin:false
      }
    },
    //管理员主界面
    {
      path: '/admin',
      component: Admin,
      name: '管理员',
      // 图标
      iconCls: 'fa fa-id-card-o',
      children: [
        { path: '/admin/addaccount', component: Addaccount, name: '添加账号', iconCls: 'fa fa-address-card',
          meta:{ isLogin:true, auth: 'admin'},
          children:[
            {path: '/admin/addservice', component: Addaccount, name: '添加客服', meta:{ isLogin:true, auth: 'admin'}},
            {path: '/admin/adddoctor', component: Addaccount, name: '添加医生', meta:{ isLogin:true, auth: 'admin'}}] },
        { path: '/admin/serviceList', component: ServiceList, name: '客服列表', iconCls: 'fa fa-bar-chart',
          meta:{isLogin:true, auth: 'admin'} }
      ],
      meta:{
        // 是否需要登录权限
        isLogin:true,
        // 账号类型
        auth: 'admin'
      }
    },
    // 客服主界面
    {
      path: '/service',
      component: Service,
      name: '客服',
      iconCls: 'fa fa-id-card-o',
      meta:{
        isLogin:true,
        auth: 'service'
      }
    },
    // 医生主界面
    {
      path: '/Doctor',
      component: Doctor,
      name: '医生',
      iconCls: 'fa fa-id-card-o',
      meta:{
        isLogin:true,
        auth: 'doctor'
      }
    },
    // // 添加账户
    // {
    //   path: '/Admin/Addaccount',
    //   component: Addaccount,
    //   name: '添加客服/医生',
    //   iconCls: 'fa fa-address-card',
    //   meta:{
    //     isLogin:true,
    //     auth: 'admin'
    //   }
    // },
    // // 客服列表
    // {
    //   path: '/Admin/ServiceList',
    //   component: ServiceList,
    //   name: '客服列表',
    //   iconCls: 'fa fa-bar-chart',
    //   meta:{
    //     isLogin:true,
    //     auth: 'admin'
    //   }
    // }
  ]
})
