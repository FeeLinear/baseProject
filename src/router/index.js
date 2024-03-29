import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
    path: '/404',
    component: () => import('@/views/fw/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/fw/401'),
    hidden: true
  },
  {
    path: '/err',
    component: () => import('@/views/fw/err'),
    hidden: true
  },
  {
    path: '/noAccess',
    component: () => import('@/views/fw/noAccess'),
    hidden: true
  },
  {
    path: '/loading',
    component: () => import('@/views/fw/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/demo',
    children: null
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/index'),
    name: 'demo',
    meta: {
      title: '已开发票订单'
    },
    hidden: true,
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
