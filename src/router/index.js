import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import Admin from '@/components/Admin'
import Doctor from '@/components/Doctor'
import Service from '@/components/Service'

// 管理员组件
import Servicelist from '@/components/admin/ServiceList'
import Addservice from '@/components/admin/Addservice'
import Adddoctor from '@/components/admin/Adddoctor'
import Changedoctor from '@/components/admin/Changedoctor'
import Changeaccount from '@/components/admin/Changeaccount'
import Serviceonlinelist from '@/components/admin/Serviceonlinelist'

// 客服组件
import ChangeDoctor_s from '@/components/service/Changedoctor'
import PostRecommendation from '@/components/service/PostRecommendation'
import PostRegist from '@/components/service/PostRegist'
import RegistOnLine from '@/components/service/RegistOnLine'
import UploadLecture from '@/components/service/UploadLecture'
import WebChatRegist from '@/components/service/WebChatRegist'
import DoctorOnLine from '@/components/service/DoctorOnLine'

Vue.use(Router);

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
    //管理员主界面 iconCls 见 http://fontawesome.dashgame.com/
    {
      path: '/admin', component:Admin, name: '账号管理', iconCls: 'fa fa-address-card',
          meta:{ isLogin:true, auth: 'admin'},
          children:[
            {path: '/admin/add_service', component: Addservice, name: '添加客服', meta:{ isLogin:true, auth: 'admin'}},
            {path: '/admin/add_doctor', component: Adddoctor, name: '添加医生', meta:{ isLogin:true, auth: 'admin'}},
            {path: '/admin/change_account', component: Changeaccount, name: '修改账号', meta:{ isLogin:true, auth: 'admin'}},
            {path: '/admin/change_doctor', component: Changedoctor, name: '医生信息修改', meta:{ isLogin:true, auth: 'admin'}},
            ]
    },
    { path: '/admin/', component: Admin, name: '客服管理', iconCls: 'fa fa-bar-chart',
          meta:{isLogin:true, auth: 'admin'},
          children:[
            {path: '/admin/service_list1', component: Servicelist, name: '所有客服', meta:{ isLogin:true, auth: 'admin'}},
            {path: '/admin/service_list2', component: Serviceonlinelist, name: '在线客服', meta:{ isLogin:true, auth: 'admin'}}
            ]
    },
    // 客服主界面
    {
      path: '/service', component:Service, name: '信息发布', iconCls: 'fa fa-edit',
      meta:{ isLogin:true, auth: 'service'},
      children:[
        {path: '/service/upload_lecture', component: UploadLecture, name: '健康讲座上传', meta:{ isLogin:true, auth: 'service'}},
        {path: '/service/upload_recommendation', component: PostRecommendation, name: '体检推荐发布', meta:{ isLogin:true, auth: 'service'}},
        {path: '/service/change_doctor', component: ChangeDoctor_s, name: '医生信息录入', meta:{ isLogin:true, auth: 'service'}},
      ]
    },
    { path: '/service', component: Service, name: '在线挂号', iconCls: 'fa fa-braille',
      meta:{isLogin:true, auth: 'service'},
      children:[
        {path: '/service/regist_online', component: RegistOnLine, name: '挂号列表', meta:{ isLogin:true, auth: 'service'}},
        {path: '/admin/post_regist', component: PostRegist, name: '挂号反馈', meta:{ isLogin:true, auth: 'service'}}
      ]
    },
    { path: '/service', component: Service, name: '语音问诊调配', iconCls: 'fa fa-comments',
      meta:{isLogin:true, auth: 'service'},
      children:[
        {path: '/service/service_list1', component: WebChatRegist, name: '等待调配列表', meta:{ isLogin:true, auth: 'service'}},
        {path: '/service/service_list2', component: DoctorOnLine, name: '在线医生列表', meta:{ isLogin:true, auth: 'service'}}
      ]
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
